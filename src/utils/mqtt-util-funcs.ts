/*
 * @Author: chenmeifeng
 * @Date: 2024-01-22 10:26:21
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-03-13 14::25
 * @Description:
 */
import { StorageUserInfo } from "@configs/storage-cfg";
import { LOGIN_INFO_FOR_FUNS } from "@store/atom-auth";
import { getStorage } from "@utils/util-funs";
import { AxiosRequestConfig } from "axios";

import { ILoginInfo } from "@/types/i-auth";

export function formDataToPlainObject(apiconfig: AxiosRequestConfig) {
  Object.keys(apiconfig).forEach((key: string) => {
    if (Object.prototype.hasOwnProperty.call(apiconfig, key)) {
      const value = (apiconfig as any)[key];
      if (value instanceof FormData) {
        const formDataPlainObject = {};
        value.forEach((v, k) => {
          (formDataPlainObject as any)[k] = v;
        });
        (apiconfig as any)[key] = formDataPlainObject;
      }
    }
  });
  return apiconfig;
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
}

export function uint8ArrayToText(
  uint8Array: Uint8Array,
  encoding: string
): string {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(uint8Array);
}

export function constructRes(
  value: string,
  blobType: string,
  headers: object
): object {
  const blob = new Blob([value], { type: blobType });
  return {
    data: blob,
    status: 200,
    statusText: "OK",
    headers: headers,
  };
}

export function dealPayload(
  mqData: any,
  toLoginSystem: (params: string) => void,
  apiconfig: AxiosRequestConfig
) {
  const { payload, headers } = mqData;
  let res = null;
  if (headers && headers["content-type"] == "text/csv;charset=UTF-8") {
    const uint8ArrayData = base64ToUint8Array(payload);
    const decodedString = uint8ArrayToText(uint8ArrayData, "GB2312");
    res = constructRes(decodedString, "text/csv", headers);
  } else if (
    headers &&
    headers["content-type"] == "application/vnd.ms-excel;charset=UTF-8"
  ) {
    res = constructRes(payload, "application/vnd.ms-excel", headers);
  } else if (headers && headers["content-type"] == "image/svg+xml") {
    const textDecoder = new TextDecoder("utf-8");
    const decodedString = textDecoder.decode(
      new Uint8Array([...atob(payload)].map((char) => char.charCodeAt(0)))
    );
    res = decodedString;
  } else if (typeof payload === "string" && payload) {
    res = JSON.parse(payload);
  } else {
    res = payload;
  }
  const { msg, code, data } = res;
  if (code === "401") {
    return toLoginSystem(msg || "登录信息已过期, 请重新登录！");
  } else if (code === "200" && data) {
    return data;
  } else if (res && apiconfig.responseType !== "blob") {
    return res;
  } else {
    return res;
  }
}

export function dealConfigParams(apiconfig: AxiosRequestConfig) {
  if (apiconfig?.url?.includes("stationSvg")) {
    apiconfig.url = `${apiconfig.url}`;
  } else {
    apiconfig.url = `${process.env["VITE_API_BASE_SERVER"]}${apiconfig.url}`;
  }
  let loginInfo = LOGIN_INFO_FOR_FUNS.loginInfo;
  if (!loginInfo)
    LOGIN_INFO_FOR_FUNS.loginInfo = loginInfo = getStorage<ILoginInfo | null>(
      StorageUserInfo
    );
  const { token } = loginInfo || {};
  if (token) {
    if (apiconfig && apiconfig.headers && "headers" in apiconfig) {
      apiconfig["headers"]["Cookie"] = `satoken=${token}`;
    } else {
      apiconfig["headers"] = { Cookie: `satoken=${token}` };
    }
  }
  apiconfig = formDataToPlainObject(apiconfig);

  return apiconfig;
}
