/*
 * @Author: chenmeifeng
 * @Date: 2025-07-30 16:39:44
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-15 11:13:35
 * @Description
 */
import "./form.less"
import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types"
import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { st_rule_model_form } from "../configs/form"
import { Button, Select, Space } from "antd"
import { IDeviceSignal, TDeviceType } from "@/types/i-config"
import StateSignForm from "./sign"
import EditRuleModel from "./point"
import { addRule, processExpression } from "../methods"
import { stateInfo } from "../types"
import { getStorage, showMsg } from "@/utils/util-funs"
import { useAtomValue } from "jotai"
import { AtomConfigMap } from "@/store/atom-config"
import { StorageDeviceStdState } from "@/configs/storage-cfg"
const CONDITION_OPTIONS = [
  { label: "或", value: "||" },
  { label: "与", value: "&&" },
]
export interface IStRuleFormProps {
  tableSource: Array<stateInfo>
  editType: "edit" | "add" | "see"
  buttonClick: (type) => void
  deviceType: TDeviceType
  modelId: number
  selectRowInfo?: stateInfo
  currentId?: number
}
export interface IStRuleFormRefs {}
const StateRuleForm = forwardRef<IStRuleFormRefs, IStRuleFormProps>((props, ref) => {
  const { modelId, deviceType, editType, currentId, selectRowInfo, tableSource, buttonClick } = props

  const signRef = useRef(null)
  const pointRef = useRef(null)
  const formRef = useRef<IFormInst | null>(null)
  const [formItemConfigs, setFormItemConfigs] = useState({})
  const [curCondition, setCurCondition] = useState("sign")
  const [condition, setCondition] = useState("||")
  const [stateInfos, setStateInfos] = useState([])
  const [chooseState, setChooseState] = useState(null)

  const btnClkRef = useRef((type: "ok" | "close") => {
    if (type === "ok") {
      formRef.current?.submit()
      return
    } else if (type === "close") {
      buttonClick?.("close")
    }
  })
  const getSignInfo = (signRule) => {
    const arr = Object.values(signRule)?.filter((i: any) => i.length)
    const result: any =
      arr?.reduce((prev: Array<string>, cur: any, idx) => {
        const one = cur?.map((i) => `${JSON.stringify(i.value)} in signState`)?.join(" && ") || ""
        prev = prev.concat([`(${one})`])
        return prev
      }, []) || []
    return result?.join(" || ")
  }
  const changeSelect = (e) => {
    setCondition(e)
  }
  const changeCondition = (e) => {
    setCurCondition(e)
  }
  const onFinish = async () => {
    // 如果点击按钮是新增，先判断列表返回的长度，长度小于1，则新增，反之修改
    // 如果点击按钮是修改，把当前的数据更新到tableSource中
    const type = editType === "add" && !tableSource?.length ? "add" : "edit"
    const { subStateName, mainStateName } = chooseState
    const { duration, priority, subStateCode, mainStateCode } = formRef.current.getInst()?.getFieldsValue()
    const signInfo = getSignInfo(signRef.current.signInfo)
    if (!pointRef.current?.pointRule && !Object.keys(signRef.current.signInfo || {})?.length) {
      showMsg("至少存在一种规则")
      return
    }
    const oneFormula = {
      duration,
      priority,
      subStateCode,
      subStateName,
      mainStateCode,
      mainStateName,
      rule: pointRef.current?.pointRule || "",
      ruleBefore: signInfo ? signInfo + ` ${pointRef.current?.pointRule ? condition : ""}` : "",
      ruleBeforeInfo: JSON.stringify(signRef.current.signInfo),
      condition: condition,
    }

    const editTypeForm =
      type === "edit" ? tableSource?.filter((i) => i.idx !== selectRowInfo?.idx)?.concat([oneFormula]) : []
    const formula = type === "add" ? [oneFormula] : editTypeForm
    const params = {
      id: currentId || selectRowInfo?.id,
      modelId,
      enabled: true,
      formula: formula,
      pointName: "df",
    }
    const res = await addRule(params, type)
    buttonClick?.("ok")
  }
  const columns = useMemo(() => {
    const disabled = editType !== "add"
    return st_rule_model_form(disabled)
  }, [editType])

  const formChange = (changedValues) => {
    if (changedValues.mainStateCode) {
      const formIns = formRef.current.getInst()
      const { mainStateCode } = changedValues
      const mainState = stateInfos?.find((i) => i.value === mainStateCode)
      formIns.setFieldsValue({
        mainStateName: mainState?.label,
        subStateCode: undefined,
        subStateName: undefined,
      })
      setChooseState((prev) => {
        return { ...prev, mainStateName: mainState?.label }
      })
      setFormItemConfigs((prev) => {
        return {
          ...prev,
          subStateCode: {
            options: mainState?.children,
          },
        }
      })
    } else if (changedValues.subStateCode) {
      const formIns = formRef.current.getInst()
      const { mainStateCode } = formIns.getFieldsValue()
      const subState = stateInfos
        ?.find((i) => i.value === mainStateCode)
        ?.children?.find((i) => i.value === changedValues.subStateCode)
      formIns.setFieldsValue({
        subStateName: subState?.label,
      })
      setChooseState((prev) => {
        return { ...prev, subStateName: subState?.label }
      })
    }
  }
  useEffect(() => {
    if (editType === "edit" && selectRowInfo) {
      const formIns = formRef.current.getInst()
      const { duration, priority, subStateCode, subStateName, mainStateCode, mainStateName, ruleBefore } = selectRowInfo
      const subStationOptions = stateInfos?.find((i) => i.value === mainStateCode)?.children
      setFormItemConfigs((prev) => {
        return {
          ...prev,
          subStateCode: {
            options: subStationOptions,
          },
        }
      })
      formIns.setFieldsValue({ duration, priority, subStateCode, subStateName, mainStateCode, mainStateName })
      setChooseState({ mainStateName, subStateName })

      const ruleBeforeStr = processExpression(ruleBefore)
      const cdtion = ruleBeforeStr?.endsWith("||") || ruleBeforeStr.endsWith("&&") ? ruleBeforeStr.slice(-2) : "||"
      setCondition(cdtion || "||")
    }
  }, [editType, selectRowInfo, stateInfos])
  useEffect(() => {
    const deviceStdStateMap = getStorage(StorageDeviceStdState)
    const mainStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "MAIN")
    const subStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "SUB")
    const result = mainStates?.map((i) => {
      return {
        label: i.stateDesc,
        value: i.state,
        children: subStates
          ?.filter((j) => j.parentId === i.id)
          ?.map((j) => {
            return {
              label: j.stateDesc,
              value: j.state,
            }
          }),
      }
    })
    setStateInfos(result)
    setFormItemConfigs({ mainStateCode: { options: result } })
  }, [deviceType])
  return (
    <div className="state-rule-form">
      <CustomForm
        ref={formRef}
        formOptions={{ onValuesChange: formChange }}
        itemOptionConfig={formItemConfigs}
        itemOptions={columns}
        onSearch={onFinish}
      />

      <div className="state-rform-rule">
        <div className="rule-top">
          <span
            className={`condition ${curCondition === "sign" ? "span-active" : ""}`}
            onClick={() => changeCondition("sign")}
          >
            挂牌规则
          </span>
          <Select
            options={CONDITION_OPTIONS}
            value={condition}
            style={{ width: "5em" }}
            dropdownStyle={{ zIndex: 999999 }}
            onChange={(e) => changeSelect(e)}
          ></Select>
          <span
            className={`condition ${curCondition === "point" ? "span-active" : ""}`}
            onClick={() => changeCondition("point")}
          >
            测点规则
          </span>
        </div>
        <div className="rule-content-detail">
          <div style={{ display: curCondition !== "sign" ? "none" : "block", height: "100%" }}>
            <StateSignForm ref={signRef} deviceType={deviceType} info={selectRowInfo?.ruleBefore} />
          </div>
          <div style={{ display: curCondition !== "point" ? "none" : "block", height: "100%" }}>
            <EditRuleModel ref={pointRef} modelId={modelId} info={selectRowInfo?.rule} />
          </div>
        </div>
      </div>
      <div className="confirm-bottom">
        <Space style={{ width: "100%", justifyContent: "end", marginTop: "1em" }}>
          <Button onClick={btnClkRef.current.bind(null, "ok")}>确认</Button>
          <Button onClick={btnClkRef.current.bind(null, "close")}>取消</Button>
        </Space>
      </div>
    </div>
  )
})

export default StateRuleForm
