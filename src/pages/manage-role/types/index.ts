/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2023-11-28 10:55:46
 * @Description:
 */

export interface IUserList {
  role: string;
  description: string;
  id: number;
}

export interface IUserListParam {
  pageNum?: number;
  pageSize?: number;
}

export type TUserTbActInfo = {
  key: string;
  label: string;
};
export interface TModelFrAndTbInfo {
  role: string;
  description: string;
  id: number;
}
