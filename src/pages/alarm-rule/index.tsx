/*
 * @Author: chenmeifeng
 * @Date: 2024-08-28 16:38:00
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-16 16:28:05
 * @Description:
 */
import "./index.less"
import { DVS_CONTROL_SELECT } from "./configs"
import SelectWidthAll from "@/components/select-with-all"
import { useEffect, useState } from "react"
import BatchDevice from "./components/batch-device"
import AlarmRuleTable from "./components/rule-table"
import { IBatchStn2DvsTreeData } from "./types"
import { AtomConfigMap } from "@/store/atom-config"
import { useAtomValue } from "jotai"

export default function AlarmRule() {
  const [deviceType, setDeviceType] = useState("WT")
  const [devices, setDevices] = useState<IBatchStn2DvsTreeData[]>([])

  const { deviceTypeMap } = useAtomValue(AtomConfigMap).map
  return (
    <div className="l-full alarm-rule-wrap">
      <div className="alarm-rule-left">
        <div className="rule-left-top">
          <SelectWidthAll
            style={{ width: "80%" }}
            options={deviceTypeMap}
            value={deviceType}
            onChange={setDeviceType}
          />
        </div>
        <div className="rule-left-bottom">
          <BatchDevice deviceType={deviceType} onSelect={(e) => setDevices(e)} />
        </div>
        {/* <ControlBatchTree deviceType={deviceType} onSubmit={onSubmitRef.current} searchDevice={searchVal} /> */}
      </div>
      <div className="alarm-rule-right">
        <AlarmRuleTable devices={devices} />
      </div>
    </div>
  )
}
