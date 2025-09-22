/*
 * @Author: chenmeifeng
 * @Date: 2025-07-31 15:01:53
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-31 15:02:18
 * @Description:
 */
import { IApiMapItem } from "@/types/i-api"

const SERVE_NAME = "/monitor/info"
export const dvsSignalApiMap: IApiMapItem = {
  getDeviceSignInfo: {
    url: `${SERVE_NAME}/getDeviceSignInfo`,
    method: "get",
    desc: "设备挂牌-设备挂牌信息",
  },
}
