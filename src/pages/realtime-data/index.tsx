/*
 * @Description: 实时数据
 */
import "./index.less"
import React, { useEffect, useState, useRef } from "react"
import { Tree } from "antd"
import CustomTable from "@/components/custom-table"
import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, RP_DEVICE_SCH_FORM_ITEMS } from "./configs/index"
import { getStation, getDevices, getPointByDeviceCode } from "./methods/index"
import { useRealtimeData } from "@/hooks/use-stomp"
export default function ModelStation() {
  const [tableData, setTableData] = useState([])
  const [treedata, setTreeData] = useState([])
  const [stations, setStations] = useState([])
  const [modelList, setModelList] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const { connected, realtimeData, logs, messageCount } = useRealtimeData()

  // 添加ref来存储当前选中的设备和定时器
  const selectedDeviceRef = useRef<string | null>(null)
  // 添加ref来存储定时器
  const intervalRef = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => { 
    getStation().then(res => {
      if(res && res.records) {
        setStations(res.records)
      }
    })
    getDevices().then(res => {
      if(res && res.records) {
        setDeviceList(res.records)
        const uniqueModelIds = [...new Set(res.records.map(item => item.modelId))]

        const uniqueModelList = uniqueModelIds.map(id => {
          const firstMatch = res.records.find(item => item.modelId === id)!
          return {
            modelId: id,
            modelName: firstMatch.modelName,
            stationId: firstMatch.stationId,
            title: firstMatch.modelName
          }
        })
        setModelList(uniqueModelList)
      }
    })
  },[])

  // 辅助函数：检查设备是否有时间戳
  const hasDeviceTimestamp = (deviceItem) => {
    const rtValue = realtimeData?.[deviceItem.deviceCode]
    if (typeof rtValue === 'string') {
      const timestamp = rtValue.split('|')[2]?.trim()
      return timestamp && !isNaN(Number(timestamp))
    }
    return false
  }

  useEffect(() => {
    // 首先找出所有有时间戳设备的场站ID和型号ID
    const stationIdsWithTimestamp = new Set()
    const modelIdsWithTimestamp = new Set()
    
    deviceList.forEach(deviceItem => {
      if (hasDeviceTimestamp(deviceItem)) {
        stationIdsWithTimestamp.add(deviceItem.stationId)
        modelIdsWithTimestamp.add(`${deviceItem.stationId}-${deviceItem.modelId}`)
      }
    })

    let handleRes =  stations.map(item => {
      const hasTimestampInStation = stationIdsWithTimestamp.has(item.id)
      
      return {
        ...item,
        key: `station-${item.id}-${item.stationCode}`,
        title: item.fullName,
        className: hasTimestampInStation ? 'has-timestamp-children' : undefined,
        children: modelList
          .filter(i => i.stationId === item.id) // 只显示属于当前场站的型号
          .map(i => 
            {
              const hasTimestampInModel = modelIdsWithTimestamp.has(`${item.id}-${i.modelId}`)

              return {
                ...i,
                key: `model-${item.id}-${i.modelId}`,
                isLeaf: false,
                className: hasTimestampInModel ? 'has-timestamp-children' : undefined,
                children: deviceList
                  .filter(deviceItem => 
                    deviceItem.stationId === item.id && deviceItem.modelId === i.modelId
                  )
                  .map(deviceItem => {
                      return {
                        ...deviceItem,
                        key: `device-${deviceItem.id}-${deviceItem.deviceCode}`,
                        className: hasTimestampInModel ? 'has-timestamp-children' : undefined,
                        title: (() => {
                          const rtValue = realtimeData?.[deviceItem.deviceCode]
                          if (typeof rtValue === 'string') {
                            const timestamp = rtValue.split('|')[2]?.trim()
                            if (timestamp) {
                              const timestampNum = Number(timestamp)
                              if (!isNaN(timestampNum)) {
                                const date = new Date(timestampNum)
                                // 格式化为 MM-dd HH:mm:ss
                                const month = String(date.getMonth() + 1).padStart(2, '0')
                                const day = String(date.getDate()).padStart(2, '0')
                                const hours = String(date.getHours()).padStart(2, '0')
                                const minutes = String(date.getMinutes()).padStart(2, '0')
                                const seconds = String(date.getSeconds()).padStart(2, '0')
                                const formattedTime = `${month}-${day} ${hours}:${minutes}:${seconds}`
                                return `${deviceItem.deviceCode}[${formattedTime}]`
                              }
                            }
                          }
                          return deviceItem.deviceCode
                        })(),
                        isLeaf: true
                      }
                  }),
              }
            }
          )
      }
    })
    setTreeData(handleRes)
  },[stations, deviceList, realtimeData])


  // 定时更新表格数据的函数
  const updateTableData = async (deviceCode: string) => {
    try {
      const res = await getPointByDeviceCode(deviceCode)
      let handleData = realtimeData[deviceCode].split('|').pop()?.trim().split(',')
      res.forEach((i, index) => {
        i.value = handleData?.[index] || ''
      })
      setTableData(res)
    } catch (error) {
      console.error('Failed to update table data:', error)
    }
  }

  const onSelect = (selectedRowKeys: React.Key[], 
    info: { 
      selected: boolean,      
      selectedNodes: any[],
      node: any,
      event: "select"
    }
  ) => { 
    let realTimeKeys = Object.keys(realtimeData)
    if(String(selectedRowKeys[0])?.includes("device")) {
      if(realTimeKeys.includes(info.node.deviceCode)) {
        const deviceCode = info.node.deviceCode
      
        // 清除之前的定时器
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        
        // 更新当前选中的设备
        selectedDeviceRef.current = deviceCode
        
        // 立即获取数据
        getPointByDeviceCode(deviceCode).then(res=> {
          let handleData = realtimeData[deviceCode].split('|').pop()?.trim().split(',')
          res.forEach((i,index) => (
            i.value = handleData?.[index] || ''
          ))
          setTableData(res)
          
          // 启动新的定时器，每5秒更新数据
          intervalRef.current = setInterval(() => {
            updateTableData(deviceCode)
          }, 5000)
        })

      } else {
        // 如果没有选择有效的设备，清除定时器和表格数据
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        selectedDeviceRef.current = null
        setTableData([])
      }
    }
  }
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return (
    <div className="l-full alarm-rule-wrap">
      <div className="alarm-rule-left">
          <div className="rule-left-top">
            <Tree
              defaultExpandedKeys={[]}
              treeData={treedata}
              onSelect={onSelect}
            />
          </div>
      </div>
      <div className="alarm-rule-right">
        <CustomTable
          rowKey="id"
          limitHeight
          columns={DEVICE_ATT_COLUMNS({})}
          dataSource={tableData}
          // pagination={pagination}
        />
      </div>
    </div>
  )
}
