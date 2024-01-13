import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { useForm } from "antd/es/form/Form";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  useChangePasswordMutation,
  useChangePasswordWithTokenMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
} from "../../slices/api/apiSlice";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { verify } from "../../slices/authSlice";
import VerifyOTP from "./VerifyOTP";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "@admanager/shared";

interface EmailConfirmationProps {
  type: "email-verification" | "change-password" | "forgot-password";
}

const EmailConfirmation = ({ type }: EmailConfirmationProps) => {
  const [form] = useForm();
  const [otpForm] = useForm();

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [
    sendEmailVerificationCode,
    { data: emailVerificationData, error: emailVerificationError },
  ] = useSendVerificationCodeMutation();

  const [
    changePasswordWithToken,
    { data: changePwdTokenData, error: changePwdTokenError },
  ] = useChangePasswordWithTokenMutation();

  const [changePassword, { data: changePwdData, error: changePwdError }] =
    useChangePasswordMutation();

  const [verifyEmail, { data: verifyEmailData, error: verifyEmailError }] =
    useVerifyEmailMutation();

  const [isInfoSubmitted, setInfoSubmitted] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const [changePwdTokenReq, setChangePwdTokenReq] =
    useState<AuthApi.ChangePasswordTokenRequest | null>(null);

  const openNotification = (type: string, msg: string, desc?: string) => {
    if (type == "error") {
      api[type]({
        message: msg || "Thao tác thất bại",
        description: desc,
        duration: 0,
      });
    } else if (type == "success") {
      api[type]({
        message: msg || "Thao tác thành công",
        description: desc,
        duration: 0,
      });
    }
  };

  const onSubmitEmail = (values: any) => {
    if (type == "email-verification" || type == "forgot-password") {
      sendEmailVerificationCode({
        email: values.email,
      });
    }
    if (type == "change-password") {
      changePassword({
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
    } else if (type == "forgot-password") {
      setChangePwdTokenReq({
        newPassword: values.newPassword,
        confirmToken: authState.confirmToken,
        code: "",
      });
    }
  };

  const onSubmitOTPCode = (otpCode: string) => {
    if (type === "forgot-password" && changePwdTokenReq !== null) {
      console.log({
        ...changePwdTokenReq,
        confirmToken: authState.confirmToken,
        code: otpCode,
      });
      changePasswordWithToken({
        ...changePwdTokenReq,
        confirmToken: authState.confirmToken,
        code: otpCode,
      });
    }
    if (type === "email-verification") {
      verifyEmail({
        confirmToken: authState.confirmToken,
        code: otpCode,
      });
    }
  };

  useEffect(() => {
    if (!authState.isLoggedIn && type === "change-password") {
      //navigate("/");
    }
  }, []);

  useEffect(() => {
    if (emailVerificationData) {
      dispatch(verify(emailVerificationData));
      openNotification("success", "Đã gửi mã OTP tới email thành công.");
      setTimeout(() => setInfoSubmitted(true), 2000);
    }
    if (emailVerificationError) {
      openNotification("error", "Không thể gửi mã OTP tới email lúc này.");
      form.resetFields();
    }
    if (changePwdTokenData) {
      openNotification("success", "Mật khẩu đã khôi phục thành công!");
      //setTimeout(() => navigate("/auth/login"), 2000);
    }
    if (changePwdTokenError) {
      openNotification("error", "Hiện tại không thể khôi phục mật khẩu!");
      form.resetFields();
    }
    if (changePwdData) {
      openNotification("success", "Đổi mật khẩu thành công");
      //setTimeout(() => navigate("/"), 2000);
    }
    if (changePwdError) {
      openNotification("error", "Hiện tại không thể đổi mật khẩu!");
      form.resetFields();
    }
    if (verifyEmailData) {
      openNotification("success", "Xác thực email thành công!");
      //setTimeout(() => navigate("/"), 2000);
    }
    if (verifyEmailError) {
      openNotification("error", "Xác thực email thất bại!");
      form.resetFields();
    }
  }, [
    emailVerificationData,
    emailVerificationError,
    changePwdTokenData,
    changePwdTokenError,
    changePwdData,
    changePwdError,
    verifyEmailData,
    verifyEmailError,
  ]);

  return (
    <>
      {!isInfoSubmitted && (
        <div className="flex flex-col">
          {contextHolder}
          <h3 className="my-5 self-center text-2xl font-semibold">
            {type == "change-password" && <span> Đổi mật khẩu </span>}
            {type == "email-verification" && <span> Xác nhận email </span>}
            {type == "forgot-password" && <span> Quên mật khẩu </span>}
          </h3>

          <Form
            form={form}
            style={{ minWidth: 350 }}
            onFinish={onSubmitEmail}
            className="my-5 self-center"
          >
            {type !== "change-password" && (
              <Form.Item
                style={{ minWidth: 350 }}
                validateFirst
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Nhập email của bạn!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
                name="email"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  prefix={<MailOutlined className="mx-1" />}
                />
              </Form.Item>
            )}
            <>
              {type == "change-password" && (
                <>
                  <Form.Item
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="mx-1" />}
                      type="password"
                      placeholder="Mật khẩu cũ"
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="mx-1" />}
                      type="password"
                      placeholder="Mật khẩu mới"
                    />
                  </Form.Item>
                  <Form.Item
                    dependencies={["newPassword"]}
                    name="confirmNewPassword"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập mật khẩu!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Không khớp mật khẩu!"),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="mx-1" />}
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </Form.Item>
                </>
              )}
              {type == "forgot-password" && (
                <>
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập mật khẩu mới!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="mx-1" />}
                      type="password"
                      placeholder="Mật khẩu mới"
                    />
                  </Form.Item>
                  <Form.Item
                    dependencies={["newPassword"]}
                    name="confirmNewPassword"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập lại mật khẩu mới!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Không khớp mật khẩu!"),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="mx-1" />}
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </>
          </Form>
        </div>
      )}
      {isInfoSubmitted && type !== "change-password" && (
        <VerifyOTP
          callback={(code) => {
            onSubmitOTPCode(code);
          }}
          form={otpForm}
        />
      )}
    </>
  );
};

export default EmailConfirmation;
