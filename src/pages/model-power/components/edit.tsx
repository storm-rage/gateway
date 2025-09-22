/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:19
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-17 16:44:54
 * @Description:
 */

import "./edit.less";
import { Button } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import CustomForm from "@/components/custom-form";
import { IFormInst } from "@/components/custom-form/types";

import { ST_USER_MODEL_FORM_ITEMS } from "../configs/model";
import { IUserList, TModelFrAndTbInfo } from "../types";
import { TModalType } from "@/types/i-config";

export interface IPerateRef {}
export interface IOperateProps {
  data?: any;
  buttonClick?: (type: "ok" | "close", data?: TModelFrAndTbInfo) => void;
  editType?: TModalType;
  loading?: boolean;
  selectRowInfo?: IUserList | null;
}

const AddModal = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { buttonClick, editType, selectRowInfo } = props;
  const formRef = useRef<IFormInst | null>(null);
  //组件数据集合
  const [formList, setFormItemConfig] = useState({});
  const currentId = useRef<number>();

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    if (editType !== "add") {
      const formInsts = formRef.current?.getInst?.();
      const { id, loginName, realName, roleId } = selectRowInfo || {};
      currentId.current = id;
      formInsts?.setFieldsValue({
        loginName,
        realName,
        roleId,
      });
    }
    allAsyncPromise().then((r) => r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allAsyncPromise = async () => {};

  const onFinish = (formValue: TModelFrAndTbInfo) => {
    buttonClick?.("ok", { ...formValue, id: currentId.current });
  };
  const btnClkRef = useRef((type: "ok" | "close") => {
    if (type === "ok") {
      formRef.current?.submit?.();
      return;
    }
    buttonClick?.("close");
  });
  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    getInst: () => formRef.current?.getInst?.(),
    getFormValues: () => formRef.current?.getFieldsValue?.(),
  }));
  return (
    <div className="user-model">
      <CustomForm
        ref={formRef}
        formOptions={{ layout: "horizontal" }}
        itemOptionConfig={formList}
        itemOptions={ST_USER_MODEL_FORM_ITEMS}
        onSearch={onFinish}
      />
      <div className="confirm-btn">
        <Button onClick={btnClkRef.current.bind(null, "ok")}>保存</Button>
        <Button onClick={btnClkRef.current.bind(null, "close")}>取消</Button>
      </div>
    </div>
  );
});

export default AddModal;
