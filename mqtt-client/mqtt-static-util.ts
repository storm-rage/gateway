/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 14:20:36
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 16:32:42
 * @Description:
 */
import MqttClientBase from "./mqtt-client-base";

interface IMqttStaticUtil {
  mq: MqttClientBase | null;
  mainWindowSend: (name: string, ...set: any) => void;
  init: (mqttModule: any, options: IMqttClient) => void;
}

const MqttStaticUtil: IMqttStaticUtil = {
  mq: null,
  mainWindowSend: () => {},
  init: (mqttModule: any, options: IMqttClient) => {
    if (MqttStaticUtil.mq) return;

    MqttStaticUtil.mq = new MqttClientBase(options);
    MqttStaticUtil.mq.mqttConnect(mqttModule);
    MqttStaticUtil.mq.initEventListeners();
  },
};

export default MqttStaticUtil;
