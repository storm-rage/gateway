/*
 * @Author: xiongman
 * @Date: 2022-11-22 10:12:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 10:12:40
 * @Description: axios 对象
 */

import { showMsg, toLoginSystem } from "@utils/util-funs.tsx";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { addHeaders, getPendingKey, removePending } from "./axios-fun";

const request = axios.create({
  timeout: 180000, // 接口等待3分钟
  baseURL: process.env["VITE_API_BASE_SERVER"],
  withCredentials: true,
});

function handleRequest(config: InternalAxiosRequestConfig) {
  addHeaders(config);
  return config;
}

function handleResponse(res: AxiosResponse) {
  const config = res.config;
  removePending(config, getPendingKey(config));
  if (res.data.msg)
    res.data.msg = `${(config as any)["desc"] || ""} ${res.data.msg}`;
  if (res.data.code === "401") {
    return toLoginSystem(res.data.msg || "登录信息已过期, 请重新登录！");
  } else if (config.url === "/sso/login" && res.data.code === "409") {
    // 用户过期
    // showMsg("用户已过期，请修改密码", "error")
    return {
      code: 409,
      pwTimeout: true,
      msg: "用户已过期",
      id: parseInt(res.data.data),
    };
  } else if (res.data.code === "200" && res.data.data) {
    return res.data.data;
  } else if (res.data && config.responseType !== "blob") {
    return res.data;
  } else {
    return res;
  }
}

function handleError(
  error: AxiosError<{ data: any; msg: string | null; code: string }>
) {
  if (error.config) {
    const config = error.config;
    removePending(config, getPendingKey(config));
    error.message = `${error?.config["desc"] || ""} ${error.message}`;
  }
  const status = error?.response?.status;
  const errMsg = error?.response?.data?.msg;
  const errData = error?.response?.data;

  if (errData?.code === "401" && errMsg?.includes("Token无效")) {
    return toLoginSystem(errMsg || "登录信息已过期, 请重新登录！");
  }
  if (status === 504) {
    // 请求超时
    return Promise.resolve({
      code: 1,
      msg: "数据请求超时，请检查网络连接是否正常！",
      data: true,
    });
  }
  if (axios.isCancel(error)) {
    return Promise.resolve({ code: 0, msg: "CANCELED_ERROR", data: null });
  }
  if (errData?.code) return Promise.resolve(errData);
  return Promise.reject(errData || error);
}

request.interceptors.request.use(handleRequest, handleError);
request.interceptors.response.use(handleResponse, handleError);

export { request };
