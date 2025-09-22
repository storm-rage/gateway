import { IApiMapItem } from "@/types/i-api.ts"

const SERVE_NAME = "/statistics"
export const planEcle: IApiMapItem = {
  getDailyProductionData: {
    url: `${SERVE_NAME}/mock/getDailyProductionData`,
    method: "get",
    desc: "计划电量-修正列表-列表详情",
  },
  importMockDailyProduction: {
    url: `${SERVE_NAME}/mock/importMockDailyProduction`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "计划电量-修正列表-导入",
  },
  exportMockDailyProduction: {
    url: `${SERVE_NAME}/mock/exportMockDailyProduction`,
    method: "get",
    responseType: "blob",
    desc: "计划电量-修正列表-导出",
  },
}
