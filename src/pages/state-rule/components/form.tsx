/*
 * @Author: chenmeifeng
 * @Date: 2025-07-30 16:39:44
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2026-01-08 17:02:51
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
import { addRule, extractVariables, processExpression } from "../methods"
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
  buttonClick: (type, info?) => void
  deviceType: TDeviceType
  modelId: number
  selectRowInfo?: stateInfo
  showBottom?: boolean
  currentId?: number
  currentTab?: string
}
export interface IStRuleFormRefs {}
const StateRuleForm = forwardRef<IStRuleFormRefs, IStRuleFormProps>((props, ref) => {
  const { modelId, deviceType, editType, currentId, currentTab, showBottom = true, selectRowInfo, tableSource, buttonClick } = props

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
    const deviceStdStateMap = getStorage(StorageDeviceStdState)
    const mainStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "MAIN")
    const subStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "SUB")
    // 如果点击按钮是新增，先判断列表返回的长度，长度小于1，则新增，反之修改
    // 如果点击按钮是修改，把当前的数据更新到tableSource中
    const type = editType === "add" && !tableSource?.length ? "add" : "edit"
    let states = {
      subStateCode:'',
      mainStateCode:'',
      mainStateName:'',
      subStateName:'',
    }
    console.log(type, "type",editType,mainStates,subStates,'===add params')

    // const { subStateCode, mainStateCode, mainStateName, subStateName } = chooseState//新增模式取不到
    const { duration, priority, state, stateType} = formRef.current.getInst()?.getFieldsValue()
    console.log(state,'===state')
    if(editType === "add") {
      if(currentTab.startsWith('1')) {
        states.mainStateCode = state
        states.mainStateName = mainStates.find((i) => i.state == state).stateDesc
      }
      if(currentTab.startsWith('2')) {
        states.subStateCode = state
        states.subStateName = subStates.find((i) => i.state == state).stateDesc
      }
    } else if (editType === "edit") {
        const { subStateCode, mainStateCode, mainStateName, subStateName } = chooseState
        states.subStateCode = subStateCode
        states.mainStateCode = mainStateCode
        states.mainStateName = mainStateName
        states.subStateName = subStateName
    }
    const signInfo = getSignInfo(signRef.current.signInfo)
    if (!pointRef.current?.pointRule && !Object.keys(signRef.current.signInfo || {})?.length) {
      showMsg("至少存在一种规则")
      return
    }

    const oneFormula = {
      // id: tableSource[0]?.id,
      index: editType === "edit"?(selectRowInfo as any).index : '',
      duration: Number(duration),
      priority: Number(priority),
      subStateCode: currentTab.startsWith('2')?Number(subStates.find((i) => i.state == states.subStateCode).state) : Number(states.subStateCode),
      subStateName: currentTab.startsWith('2')?subStates.find((i) => i.state == states.subStateCode).stateDesc : states.subStateName,
      mainStateCode: currentTab.startsWith('1')?Number(mainStates.find((i) => i.state == states.mainStateCode).state) : Number(states.mainStateCode),
      mainStateName: currentTab.startsWith('1')?mainStates.find((i) => i.state == states.mainStateCode).stateDesc : states.mainStateName,
      rule: pointRef.current?.pointRule || "",
      // ruleBefore: signInfo ? signInfo + ` ${pointRef.current?.pointRule ? condition : ""}` : "",
      ruleBefore: signInfo ? (signInfo + ` ${pointRef.current?.pointRule ? condition : ""}`).replace(/"(\d+)"/g, "'$1'") : "",
      ruleBeforeInfo: JSON.stringify(signRef.current.signInfo).replace(/"(\d+)"/g, "'$1'"),
      condition: condition,
    }
    console.log(oneFormula,'oneFormula', selectRowInfo, currentId, signInfo )
    if (!showBottom) {
      buttonClick?.("ok", oneFormula)
      return
    }
    if(editType === "add" && stateType !== currentTab) {
      console.log(stateType, currentTab)
      stateType !== currentTab
      showMsg("列表状态类型和表单状态类型不一致，请选择正确的状态类型")
      return
    }

    const editTypeForm =
      editType === "edit" ? tableSource?.filter((i) => i.idx !== selectRowInfo?.idx)?.concat([oneFormula]) : []
    const formula = editType === "add" ? tableSource.concat(oneFormula) : editTypeForm
    const params = {
      id: tableSource[0]?.id || selectRowInfo?.id,
      modelId,
      enabled: true,
      formula: formula,
      inputPoints: extractVariables(formula),
      pointName: currentTab.startsWith('1') ? "MState" : currentTab.startsWith('2') ? "SState" : "",
    }
    const res = await addRule(params, type)
    buttonClick?.("ok")
  }
  const columns = useMemo(() => {
    const disabled = editType !== "add"
    return st_rule_model_form(disabled)
  }, [editType])

  const formChange = (changedValues) => {
    // if (changedValues.mainStateCode) {
    //   const formIns = formRef.current.getInst()
    //   const { mainStateCode } = changedValues
    //   const mainState = stateInfos?.find((i) => i.value === mainStateCode)
    //   formIns.setFieldsValue({
    //     mainStateName: mainState?.label,
    //     subStateCode: undefined,
    //     subStateName: undefined,
    //   })
    //   setChooseState((prev) => {
    //     return { ...prev, mainStateName: mainState?.label }
    //   })
    //   setFormItemConfigs((prev) => {
    //     return {
    //       ...prev,
    //       subStateCode: {
    //         options: mainState?.children,
    //       },
    //     }
    //   })
    // } else if (changedValues.subStateCode) {
    //   const formIns = formRef.current.getInst()
    //   const { mainStateCode } = formIns.getFieldsValue()
    //   const subState = stateInfos
    //     ?.find((i) => i.value === mainStateCode)
    //     ?.children?.find((i) => i.value === changedValues.subStateCode)
    //   formIns.setFieldsValue({
    //     subStateName: subState?.label,
    //   })
    //   setChooseState((prev) => {
    //     return { ...prev, subStateName: subState?.label }
    //   })
    // }
    const deviceStdStateMap = getStorage(StorageDeviceStdState)
    const mainStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "MAIN")
    const subStates = deviceStdStateMap?.filter((i) => i.deviceType === deviceType && i.stateType === "SUB")
    const formIns = formRef.current.getInst()

    let result = []
    if(changedValues.stateType) {
      const { stateType, state } = changedValues
      if(stateType == '1') {
        result = mainStates?.map((i) => {
          return {
            label: i.stateDesc,
            value: i.state,
            key: i.id,
            children: subStates
              ?.filter((j) => j.parentId === i.id)
              ?.map((j) => {
                return {
                  label: j.stateDesc,
                  value: j.state,
                  key: j.id
                }
              }),
          }
        })

      } else if(stateType == '2') { 
        result = subStates?.map((i) => {
          return {
            label: i.stateDesc,
            value: i.state,
            key: i.id
          }
        })
      }
        setStateInfos(result)
        console.log('result==',stateType,result,state)
        formIns.setFieldsValue({
          state: undefined,
        })
        setFormItemConfigs((prev) => {
          return {
            ...prev,
            state: {
              options: result,
            },
            mainStateCode: state,
            subStateCode: state,
          }
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
          // stateType: currentTab,
          state: {
            options: subStationOptions,
          },
        }
      })
      formIns.setFieldsValue({ duration, priority, state: currentTab.startsWith('1') ? mainStateName : subStateName, subStateName, mainStateName })
      setChooseState({ mainStateName, subStateName, mainStateCode, subStateCode })
      formIns.setFieldsValue({
        stateType: currentTab.startsWith('1') ? '大状态' : '小状态',
      })

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
