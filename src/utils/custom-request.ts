/*
 * @Author: chenmeifeng
 * @Date: 2024-01-17 17:21:21
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-04 17:38:45
 * @Description:
 */
import { WITH_PUBLIC_WS_TOPIC } from "@configs/mqtt-info.ts";
import CustomMqtt from "@utils/custom-mqtt.ts";
import { createUUID } from "@utils/util-funs.tsx";
import { toLoginSystem } from "@utils/util-funs.tsx";
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { request } from "@/api/index";
import { IRecordResponse } from "@/types/i-api.ts";

import { dealConfigParams, dealPayload } from "./mqtt-util-funcs";

const isElectronENV = process.env["VITE_CS"];
const isMqttProxyHttp = process.env["MQTT_PROXY_HTTP"];
const { publicTopic, topicSuffix } = WITH_PUBLIC_WS_TOPIC["proxy"];

function dealElectronServe(apiConfig: IApiItem) {
  const mqObj = new CustomMqtt();
  return new Promise((resolve) => {
    const mqttOptions: IMqttOptions = {
      topic: `/ness/${createUUID()}`,
      callback: resolve,
      unsubscribe: true,
    };
    const { cancelToken, desc, ...otherConfigs } = apiConfig;
    const tmpApiConfig = dealConfigParams(otherConfigs);
    const publishData: IPublicParam = {
      publicTopic: publicTopic, // 发送主题
      payload: tmpApiConfig,
    };
    mqObj.connect(mqttOptions, publishData);
  })
    .then((response: any) => {
      return dealPayload(response, toLoginSystem, apiConfig);
    })
    .finally(() => {
      mqObj.unsubscribe();
    });
}

function dealBrowerServe(
  params?: AxiosRequestConfig
): Promise<AxiosResponse<IRecordResponse<any>>> {
  const topicUuid = createUUID();
  const mqttClient = new CustomMqtt();
  const tmpApiConfig = dealConfigParams(params || {});

  return new Promise((resolve) => {
    const topic = `${topicSuffix}/${topicUuid}`;
    const mqttOptions: IMqttOptions = {
      topic: topic,
      callback: resolve,
      unsubscribe: true,
    };
    const publishData: IPublicParam = {
      publicTopic: publicTopic,
      payload: tmpApiConfig,
    };
    mqttClient.connect(mqttOptions, publishData);
  })
    .then((response: any) => {
      const res: any = dealPayload(response, toLoginSystem, tmpApiConfig);
      return res;
    })
    .finally(() => {
      mqttClient.unsubscribe();
    });
}

export function customRequest(apiConfig: AxiosRequestConfig) {
  if (isElectronENV) {
    return dealElectronServe(apiConfig);
  }
  if (isMqttProxyHttp && apiConfig.baseURL != "/") {
    return dealBrowerServe(apiConfig);
  }
  return request(apiConfig);
}
