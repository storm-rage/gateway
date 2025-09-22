/*
 * @Author: chenmeifeng
 * @Date: 2024-08-28 16:40:33
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-11-20 15:55:10
 * @Description:
 */
import { TOptions } from "@/types/i-antd"
import { TDeviceType } from "@/types/i-config"

export const DVS_CONTROL_SELECT: TOptions<TDeviceType> = [
  { label: "风机", value: "WT" },
  { label: "光伏", value: "PVINV" },
  { label: "储能", value: "ESPCS" },
  { label: "升压站", value: "SYZZZ" },
]
