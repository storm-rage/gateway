
import { doBaseServer } from "@/api/serve-funs"


// 删除
export const delFiveRule = async (params) => {
  const result = await doBaseServer("deleteFile", params)
  return result
}

