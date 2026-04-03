/*

 * @Description: 时序库迁移新增
*/
import "./add.less"
import { useEffect, useState, useRef, useMemo } from "react"
import { Form, Input , Select, Button, DatePicker, message } from "antd"
import {
  changeRefleshFlag,
  onSetPointSysSchFormChg,
} from "../methods"
import { doBaseServer } from "@/api/serve-funs"
import CustomForm from "@/components/custom-form"
import CustomTable from "@/components/custom-table"
import { ST_STATION_ADD_FORM_ITEMS, ST_STATION_ADD_TARGET_FORM_ITEMS, ST_DEVICE_COLUMNS } from "@/pages/timeLibrary/configs"
import { getTimeDevices, handleAddSubmit, getMeasurement } from "../methods"


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
}
const { RangePicker } = DatePicker
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
    const { buttonClick } = props
    const [loading, setLoading] = useState(false)
    const [formList, setFormItemConfig] = useState([])
    const [newFormList, setNewFormItemConfig] = useState([])
    const [stnOption, setStnOption] = useState([])
    const [dateVal, setDateVal] = useState([])
    const [sourceDevicePath, setSourceDevicePath] = useState('')
    const [targetDevicePath, setTargetDevicePath] = useState('')
    const [sourcePointCode, setSourcePointCode] = useState([])
    const [targetPointCode, setTargetPointCode] = useState([])
    const formRef = useRef()
    const targetFormRef = useRef()
    
    
    const handleSubmit = async () => { 
        if(!sourceDevicePath) {
            message.error('请选择迁移来源设备！')
            return
        } else if(!targetDevicePath) {
            message.error('请选择迁移目标设备！')
            return
        } else if (Object.keys(pointMapping).length === 0) {
            message.error('请配置设备测点信息！')
            return
        }
        const params = {
            oldDevicePath: sourceDevicePath,
            newDevicePath: targetDevicePath,
            // isAligned: true,
            measurementMap: pointMapping,
            startTime: dateVal[0]?.format('YYYY-MM-DD HH:mm:ss'),
            endTime: dateVal[1]?.format('YYYY-MM-DD HH:mm:ss'),
        }
        const res = await handleAddSubmit(params)
        console.log(res,'==res')
        if(res) {
            message.success(res)
        }
        buttonClick("ok")
    }
    const handleCancel = () => { 
        buttonClick("close")
    }
    const onSchValueChgRef = async (changedValue) => {
        const chgOptions = await onSetPointSysSchFormChg(changedValue, formRef.current)
        
        setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
        if(changedValue.modelIds) {
            let res = await getMeasurement({devicePath:changedValue.modelIds})
            setSourceDevicePath(changedValue.modelIds)
            setSourcePointCode(res)
            setPointMapping({})
            setSelectedSourcePoints([])
        }
    }
    const onTargetSchValueChgRef = async (changedValue) => { 
        const chgOptions = await onSetPointSysSchFormChg(changedValue, targetFormRef.current)
        setNewFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
        if(changedValue.modelIds) {
            let res = await getMeasurement({devicePath:changedValue.modelIds})
            setTargetDevicePath(changedValue.modelIds)
            setTargetPointCode(res)
        }
    }
    const handleDateChange = ( vals) => {
        setDateVal(vals)
    }
    const searchTable = () => {
        changeRefleshFlag(true)
        // onSearch()
      }
    
    
    const [selectedSourcePoints, setSelectedSourcePoints] = useState([])
    const [pointMapping, setPointMapping] = useState<Record<string, string>>({})
    const handleSourcePointChange = (selectedValues: string[]) => {
        setSelectedSourcePoints(selectedValues)
        // 初始化映射：每个源测点默认对应自身
        const initialMapping: Record<string, string> = {}
        selectedValues.forEach(val => {
            initialMapping[val] = val
        })
        setPointMapping(initialMapping)
    }
    return (
        <div className="add-module">
            <div className="data-module-title">选择迁移来源：</div>
            <CustomForm
                ref={formRef}
                loading={loading}
                itemOptionConfig={formList}
                itemOptions={ST_STATION_ADD_FORM_ITEMS}
                buttons={[]}
                onSearch={searchTable}
                formOptions={{
                    onValuesChange: onSchValueChgRef,
                }}
            />
            <div className="data-module-title">选择迁移目标：</div>
            <CustomForm
                ref={targetFormRef}
                loading={loading}
                itemOptionConfig={newFormList}
                itemOptions={ST_STATION_ADD_TARGET_FORM_ITEMS}
                buttons={[]}
                onSearch={searchTable}
                formOptions={{
                    onValuesChange: onTargetSchValueChgRef,
                }}
            />
            <div className="data-module-title">迁移来源测点编码：
                <div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '60%' }}
                        placeholder="请选择"
                        value={selectedSourcePoints}
                        onChange={handleSourcePointChange}
                        options={sourcePointCode}
                    />
                </div>
            </div>
            <div className="data-module-title">迁移目标测点编码：
                <div className="codes-module">
                    {Object.entries(pointMapping).map(([sourcePoint, targetPoint]) => (
                        <div key={sourcePoint} style={{ marginBottom: 8 }}>
                            <span>{sourcePoint} → </span>
                            <Input
                                value={targetPoint}
                                onChange={(e) => {
                                setPointMapping(prev => ({
                                    ...prev,
                                    [sourcePoint]: e.target.value
                                }))
                                }}
                                placeholder={`请输入 ${sourcePoint} 的目标编码`}
                                style={{ width: 200 }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="data-module-title">时间：
                <RangePicker 
                showTime 
                className="manage-date-picker" 
                placeholder={['开始时间', '结束时间']}
                onChange={handleDateChange}/>
            </div>
            <div className="confirm-btn">
                <Button className="footer-btn" onClick={handleSubmit}>确定</Button>
                <Button className="footer-btn" onClick={handleCancel}>取消</Button>
            </div>
        </div>
    )
}