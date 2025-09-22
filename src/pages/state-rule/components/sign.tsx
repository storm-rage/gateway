import "./sign.less"
import { AtomConfigMap } from "@/store/atom-config"
import { IDeviceSignal, TDeviceType } from "@/types/i-config"
import { showMsg } from "@/utils/util-funs"
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button, Select } from "antd"
import { useAtomValue } from "jotai"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { reverseParseSign } from "../methods"

export interface IStSignProps {
  deviceType: TDeviceType
  info: string
}
export interface IStSignRefs {}
interface IRule {
  [condition: number]: Array<{ key: number; value: string }>
}
const StateSignForm = forwardRef<IStSignRefs, IStSignProps>((props, ref) => {
  const { deviceType, info } = props
  const [signRule, setSignRule] = useState<IRule>({})
  const [curCondition, setCurCondition] = useState("")

  const { deviceSignal } = useAtomValue(AtomConfigMap).list

  const signalOptions = useMemo(() => {
    if (!deviceType) return []
    const prefix =
      deviceType === "WT"
        ? "1"
        : deviceType === "PVINV"
          ? "2"
          : deviceType === "ESPCS"
            ? "3"
            : deviceType === "SYZZZ"
              ? "4"
              : "9999"
    const dvsTypeSignal = deviceSignal?.filter((i: any) => i.signState.startsWith(prefix)) as IDeviceSignal[]
    const sign = dvsTypeSignal?.map((i) => {
      return {
        label: i.signDesc,
        value: i.signState,
      }
    })
    return sign
  }, [deviceSignal, deviceType])

  const addCondition = () => {
    const date = Date.now()
    setSignRule((prev) => {
      prev[date] = []
      return { ...prev }
    })
    setCurCondition(date.toString())
  }
  const changeCondition = useRef((key) => {
    setCurCondition(key)
  })
  const addSignRule = () => {
    const date = Date.now()
    if (!signRule || !Object.keys(signRule)?.length) {
      setSignRule({
        1: [{ key: date, value: "" }],
      })
      setCurCondition("1")
      return
    }

    const info = signRule[curCondition]?.concat([{ key: date, value: "" }])
    setSignRule((prev) => {
      prev[curCondition] = info
      return { ...prev }
    })
  }
  const removeRule = (key) => {
    setSignRule((prev) => {
      prev[curCondition] = prev[curCondition].filter((i) => i.key !== key)
      return { ...prev }
    })
  }
  const changeSelect = (e, key, id) => {
    setSignRule((prev) => {
      const info = prev[curCondition]?.find((i) => i.key === id) || null
      info[key] = e
      return { ...prev }
    })
  }

  useEffect(() => {
    if (info) {
      const data = reverseParseSign(info)
      // const data = JSON.parse(info) || {}
      setSignRule(data)
      const keys = Object.keys(data)
      setCurCondition(keys?.[0] || null)
    }
  }, [info])

  useImperativeHandle(ref, () => ({
    signInfo: signRule,
  }))
  return (
    <div className="state-sign-form">
      <div className="condition">
        {Object.keys(signRule)?.map((condition, cdIndx) => {
          return (
            <div className="condition-item" key={condition}>
              {cdIndx === 0 ? "" : "或"}
              <span
                className={`condition-name ${condition === curCondition ? "active" : ""}`}
                onClick={changeCondition.current.bind(null, condition)}
              >
                条件{cdIndx + 1}
              </span>
            </div>
          )
        })}
        <PlusCircleOutlined onClick={addCondition} style={{ width: "2em", height: "2em" }} />
      </div>
      <div className="condition-content">
        {signRule?.[curCondition]?.map((sign) => {
          return (
            <div className="rule-item" key={curCondition + sign.key}>
              <Select
                options={signalOptions}
                value={sign.value}
                style={{ width: "30%" }}
                dropdownStyle={{ zIndex: 999999 }}
                onChange={(e) => changeSelect(e, "value", sign.key)}
              ></Select>
              <span className="type">且</span>
              <MinusCircleOutlined
                style={{ fontSize: "2.5em", color: "#3E70EE" }}
                onClick={() => removeRule(sign.key)}
              />
            </div>
          )
        })}
        <Button type="primary" icon={<PlusCircleOutlined />} className="rule-add-btn" onClick={addSignRule}>
          添加规则
        </Button>
      </div>
    </div>
  )
})
export default StateSignForm
