import { IApiMapItem } from "@/types/i-api"

const SERVE_NAME = "/control"
// 控制日志
export const controlApiMap: IApiMapItem = {
  getControlLog: {
    url: `${SERVE_NAME}/log/query`,
    method: "post",
    param_field: "params",
    desc: "控制中心-控制日志-日志列表",
  },
  resetVarify: {
    url: `${SERVE_NAME}/reset/verify`,
    method: "post",
    param_field: "hybrid",
    desc: "控制中心-复位校验",
  },
  fetchLogExportExcel: {
    url: `${SERVE_NAME}/log/exportExcel`,
    method: "post",
    responseType: "blob",
    param_field: "params",
    desc: "控制中心-控制日志-导出",
  },
}
