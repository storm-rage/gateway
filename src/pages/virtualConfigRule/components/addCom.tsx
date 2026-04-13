/*

 * @Description: 时序库迁移新增
*/
import "./addCom.less"
import { useEffect, useState, useRef } from "react"
import { Form, Input , Select, Button, DatePicker, message } from "antd"
import {
  addRuleMethods,
  changeRefleshFlag,
  delRuleMethods,
  exportData,
  exportTemplate,
  getCtlRuleSchData,
  importFile,
  onSetPointSysSchFormChg,
  saveRuleData,
  getControlType,
} from "../methods"
import CustomForm from "@/components/custom-form"
import { ST_STATION_ADD_FORM_ITEMS, ST_STATION_ADD_TARGET_FORM_ITEMS, ST_DEVICE_COLUMNS } from "../configs/index"
import { getTimeDevices, handleAddSubmit, getMeasurement } from "../methods"
import { COMPUTED_OPTIONS } from "../configs/index"
import EditRuleModel from "./point"
import { queryDevicesByParams, getStAllDeviceModel } from "@/utils/device-funs"


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
}
export interface IOperateProps {
  data?: any
  buttonClick?: (type: "ok" | "close", data?: any) => void
//   editType?: TModalType
  loading?: boolean
  selectRowInfo?: any
  layout?: "horizontal" | "vertical" | "inline"
//   FORM_ITEMS: ISearchFormProps["itemOptions"]
  formSelectChange?: (changeVals, setFormConfigs) => void
  initialValues?: any
}
export default function AddCom(props) { 
    const { buttonClick, selectRowInfo, editType } = props
    const [loading, setLoading] = useState(false)
    const [formList, setFormItemConfig] = useState([])
    const [stnOption, setStnOption] = useState([])

    const [sourceDevicePath, setSourceDevicePath] = useState('')
    const [sourcePointCode, setSourcePointCode] = useState([])
    const formRef = useRef(null)
    const [calcType, setCalcType] = useState(0)
    const pointRef = useRef()
    const [modelId, setModelId] = useState(null)
    const [step2FormData, setStep2FormData] = useState({
        stationId:null,
        deviceType:null,
        deviceIds:null
    })
    const [pointRule, setPointRule] = useState({
        formData: null,
        ruleInfo: null
    })
    const handlePointChange = (val) => { 
        setPointRule(val)
        console.log(val,'==pointValue==')
    }
    const handleSubmit = async() => { 
        const stationData = JSON.parse(localStorage.getItem('stationData'))
        let formRefData = null
        let res = null
            formRefData = formRef.current.getInst().getFieldsValue() || {}
            console.log('==formRefData',formRefData)
            res = await queryDevicesByParams({stationCode:stationData.stationList.find(i => i.id == formRefData.stationId).stationCode})
        const params = {
            "id": selectRowInfo?.id || 0,
            "stationCode": stationData.stationList.find(i => i.id == formRefData.stationId).stationCode,//
            "deviceType": selectRowInfo.deviceType || res.find(item =>  Array.isArray(formRefData.deviceIds)?formRefData.deviceIds.includes(item.deviceId):formRefData.deviceIds.toString().includes(item.deviceId))?.deviceType,//
            "deviceCode": res.find(item =>  Array.isArray(formRefData.deviceIds)?formRefData.deviceIds.includes(item.deviceId):formRefData.deviceIds.toString().includes(item.deviceId))?.deviceCode || selectRowInfo.deviceCode,//
            "pointName": pointRule.formData.pointName,//状态点名称
            "pointDesc": pointRule.formData.pointDesc,//描述
            "pointType": pointRule.formData.pointType,//状态点类型
            "calcType": calcType,//计算类型，默认0
            "frequency": pointRule.formData.frequency,//---频率
            "formula": selectRowInfo.formula || {},
            "inputPoints": pointRule.ruleInfo,//输入测点集合
            "enabled": selectRowInfo.enabled || pointRule.formData.enabled ==1?true:false,
            "errorMessage": selectRowInfo.enabled || "",
            "tags": selectRowInfo.tags || {},
            "createTime": selectRowInfo.createTime || "",
            "updateTime": selectRowInfo.updateTime || "",
            "nextExecuteTime": selectRowInfo.nextExecuteTime || "",
            "lastExecuteTime": selectRowInfo.lastExecuteTime || ""
        }
        
        console.log(params,'==params')
        //校验必填数据
        const errorMsg = validateRequiredFields(params)
        if (errorMsg) {
            message.error(errorMsg);
            return
        }
        handleAddSubmit(params, editType)
        buttonClick("ok")
    }
    const validateRequiredFields = (params) => {
        if (!params.stationCode) return "请选择场站"
        if (!params.deviceType) return "请选择设备类型"
        if (!params.deviceCode) return "请选择设备"
        if (!params.pointName) return "请输入测点编码"
        if (!params.pointType) return "请选择测点类型"
        if (params.calcType === undefined || params.calcType === null) return "请选择计算类型"
        if (!params.inputPoints || params.inputPoints.length === 0) return "请配置输入测点规则"
        return null
    }
    const handleCancel = () => { 
        buttonClick("close")
    }
    
    const [deviceOption, setDeviceOption] = useState([])
    const onSchValueChgRef = async (changedValue) => {
        const chgOptions = await onSetPointSysSchFormChg(changedValue, formRef.current)

        if(Object.keys(chgOptions).length > 0) {
            setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
            setDeviceOption(chgOptions.deviceIds.options)
        }

        console.log(changedValue,chgOptions.deviceIds,'== 设备changedValue')

        if(changedValue.modelIds) {
            let res = await getMeasurement({devicePath:changedValue.modelIds})
            console.log(res,'== res',changedValue.modelIds)
            setSourceDevicePath(changedValue.modelIds)
            setSourcePointCode(res)
        }
        if(changedValue.deviceIds) {
            console.log(changedValue.deviceIds,'changedValue.deviceIds===')

            let res = []
            if(Array.isArray(deviceOption)) {
                deviceOption.forEach(item => {
                    if(item.children.length) {
                        item.children.forEach(child => {
                            const ids = Array.isArray(changedValue.deviceIds) 
                                ? changedValue.deviceIds 
                                : [changedValue.deviceIds]
                                
                            if (ids.includes(child.value)) {
                                res.push(item.modelId)
                            }
                        })
                    }
                })
            } else {
                res.push()
            }
            
            setModelId([...new Set(res)][0])
        }
    }
    
    const searchTable = () => {
        changeRefleshFlag(true)
      }
    
    // const { dataSource, loading, pagination, onSearch } = usePageSearch<IStPiontSysListParam, IPointSysInfo>(
    //     {
    //         serveFun: async (pageInfo, formData) => {
    //             const res = await getTimeDevices(pageInfo, formData)
    //             let records: IPointSysInfo[] = []
    //             if (Array.isArray(res.records)) {
    //                 records = res.records as IPointSysInfo[]
    //             } else if (res.records && typeof res.records === 'object' && Array.isArray(res.records)) {
    //                 records = res.records as IPointSysInfo[]
    //             }
    //             return {
    //                 records,
    //                 total: res.total ?? 0,
    //             }
    //         },
    //     },
    //     { formRef, needFirstSch: false },
    // )
    const handleComputeTypeChange = (selectedValues: string) => {
        setCalcType(Number(selectedValues))
    }
    useEffect(() => { 
        setStnOption([])
        setCalcType(selectRowInfo.calcType)
    }, [])
    useEffect(() => {
        if (editType === 'edit' && selectRowInfo) {
            const stationData = JSON.parse(localStorage.getItem('stationData'))
            const stationList = stationData?.stationList || []
            const targetStation = stationList.find(item => item.stationCode === selectRowInfo.stationCode)
            const stationId = targetStation?.id || null
            formRef.current?.getInst()?.setFieldsValue({ stationId })
            if (stationId !== null) {
                onSchValueChgRef({ stationId })
            }
        }
    }, [selectRowInfo, editType])
    //  当 deviceIds 选项加载后（即 deviceOption 更新），自动设 deviceIds
    useEffect(() => {
    if (
        editType === 'edit' &&
        selectRowInfo &&
        deviceOption.length > 0 &&
        !step2FormData.deviceIds // 防止重复设置
    ) {
        const deviceValue = findDeviceByLabel(deviceOption, selectRowInfo.deviceName)
        if (deviceValue) {
        const deviceIds = [deviceValue];
        formRef.current?.getInst()?.setFieldsValue({ deviceIds })
        setStep2FormData(prev => ({ ...prev, deviceIds }))
        setModelId(selectRowInfo.modelId)
        }
    }
    }, [selectRowInfo, editType, deviceOption])
    const findDeviceByLabel = (nodes, label) => {
    for (const node of nodes) {
        if (node.children) {
        const found = findDeviceByLabel(node.children, label)
        if (found) return found
        } else if (node.label === label) {
        return node.value
        }
    }
    return null
    }
    return (
        <div className="add-com">
            <div className="data-module">选择计算类型：
                <Select
                    allowClear
                    style={{ width: '200px' }}
                    placeholder="请选择"
                    value={COMPUTED_OPTIONS[String(calcType)] || undefined}
                    onChange={handleComputeTypeChange}
                    options={COMPUTED_OPTIONS}
                />
            </div>
            {[0,1].includes(calcType)  ?
                <div className="step-second-module">
                    {/* {calcType == 0 ?  */}
                        <CustomForm
                            ref={formRef}
                            itemOptionConfig={formList}
                            itemOptions={ST_STATION_ADD_FORM_ITEMS}
                            buttons={[]}
                            onSearch={searchTable}
                            formOptions={{
                                onValuesChange: onSchValueChgRef,
                            }}
                        /> 
                    <div className="module-box">
                        <div className="rule-top">规则配置：</div>
                        <EditRuleModel 
                            ref={pointRef} 
                            modelId={modelId} 
                            info={selectRowInfo?.rule} 
                            calcType={calcType} 
                            selectRowInfo={selectRowInfo} 
                            onChange={handlePointChange}
                        />
                    </div>
                </div>
                :null 
            }
            <div className="confirm-btn">
                <Button className="footer-btn" onClick={handleSubmit}>保存</Button>
                <Button className="footer-btn" onClick={handleCancel}>取消</Button>
            </div>
        </div>
    )
}