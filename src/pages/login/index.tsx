/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import loginLogo from "@/assets/images/login_logo.png";
import loginBg2 from "@/assets/images/login_bg2.png";
import userImage from "@/assets/images/login_user.png";
import pwdImage from "@/assets/images/login_pwd.png";
import captchaImage from "@/assets/images/captcha.png";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  loginAsyncAtom,
  loginLoadingAtom,
  userInfoAtom,
} from "@/store/atom-auth";
import { useAtomValue, useSetAtom } from "jotai";
import { sm3 } from "sm-crypto";
import VerifyCodeInput, {
  IVerifyCodeInputRef,
} from "@/components/custom-input/verify-code-input";
interface ILoginFormVal {
  name: string;
  pwd: string;
  code: { code: string; uuid: string };
}
const Login: React.FC = () => {
  const [pwdModalOpen, setPwdModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const validIptRef = useRef<IVerifyCodeInputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState(""); // 添加一个状态来存储验证码错误信息
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("savedRememberMe") === "true"
  );
  const [form] = Form.useForm<ILoginFormVal>();

  const navigate = useNavigate();
  const loginAsync = useSetAtom(loginAsyncAtom);
  const userInfo = useAtomValue(userInfoAtom);
  const loginLoading = useAtomValue(loginLoadingAtom);

  const loginRef = useRef(async (formVal: ILoginFormVal) => {
    const { code, ...other } = formVal;
    const params = {
      name: formVal.name,
      pwd: sm3(formVal.pwd),
    };
    await loginAsync({
      loginForm: { ...params, ...code },
      call: (isErr: boolean, pwTimeoutInfo) => {
        if (pwTimeoutInfo?.pwTimeout) {
          console.log("登录过期");
          setIsModalOpen(true);
          // userInfo.current = { id: pwTimeoutInfo.id }
        }
        if (!isErr) return;
        validIptRef.current?.refresh?.();
      },
    });
  });
  const onFinishFailed: FormProps<ILoginFormVal>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
  };

  // 修改密码弹窗
  const showModal = () => {
    setPwdModalOpen(true);
  };

  const handleClose = () => {
    setPwdModalOpen(false);
  };

  const loadCaptcha = async () => {};

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    if (userInfo?.token) navigate("/");
  }, [userInfo]);

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <img src={loginLogo} className="login_logo" alt="" />
        <img src={loginBg2} className="login_bg" alt="" />
        <div className="login-form-wrapper">
          <div className="login-title">新能源集中监控系统</div>
          <div className="login-form">
            <div className="login-form-title">配置管理</div>
            <div className="login-formitem">
              <Form
                form={form}
                name="login"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 450, width: "100%" }}
                onFinish={loginRef.current}
                onFinishFailed={onFinishFailed}
                onValuesChange={(changedValues) => {
                  if ("remember" in changedValues) {
                    setRememberMe(changedValues.remember);
                  }
                }}
                scrollToFirstError
                autoComplete="off"
              >
                <Form.Item
                  label=""
                  name="name"
                  rules={[{ required: true, message: "请输入用户名" }]}
                >
                  <Input
                    prefix={<img src={userImage} />}
                    placeholder="请输入用户名"
                    className="login-input"
                  />
                </Form.Item>

                <Form.Item
                  label=""
                  name="pwd"
                  rules={[{ required: true, message: "请输入密码" }]}
                >
                  <Input.Password
                    prefix={<img src={pwdImage} />}
                    placeholder="请输入密码"
                    className="login-input"
                  />
                </Form.Item>

                <Form.Item label="">
                  <Space className="login-space">
                    <Form.Item
                      name="code"
                      validateStatus={captchaError ? "error" : ""}
                      help={captchaError}
                      rules={[{ required: true, message: "请输入验证码" }]}
                      children={<VerifyCodeInput ref={validIptRef} />}
                    />
                  </Space>
                </Form.Item>

                <Form.Item label="">
                  <Space className="login-space">
                    {/* <Form.Item<FieldType>
                      name="remember"
                      valuePropName="checked"
                    >
                      <Checkbox className="login-checkbox" checked={rememberMe}>
                        记住用户名、密码
                      </Checkbox>
                    </Form.Item> */}
                    {/* <Button
                      type="text"
                      style={{ fontSize: "14px", color: "#fff" }}
                      onClick={showModal}
                    >
                      修改密码
                    </Button> */}
                  </Space>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-btn"
                    loading={loading}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
