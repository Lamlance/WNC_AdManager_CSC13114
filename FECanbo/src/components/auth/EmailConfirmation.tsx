import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { useForm } from "antd/es/form/Form";
import { LockOutlined, SendOutlined } from "@ant-design/icons";
import { useSendVerificationCodeMutation } from "../../slices/api/apiSlice";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../../slices/authSlice";
import VerifyOTP from "./VerifyOTP";

interface EmailConfirmationProps {
  type: "email-verification" | "change-password" | "forgot-password";
}

const EmailConfirmation = ({ type }: EmailConfirmationProps) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [sendEmailVerificationCode, { data, error }] =
    useSendVerificationCodeMutation();
  const [isInfoSubmitted, setInfoSubmitted] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Gửi mã xác thực thất bại!",
        description:
          JSON.stringify(error) ||
          "Không thể xác thực tài khoản của bạn ngay bây giờ. Vui lòng kiểm tra với người quản lý của bạn.",
      });
    } else if (type == "success") {
      api[type]({
        message: "Mã OTP đã được gửi cho bạn. Vui lòng kiểm tra email của bạn!",
      });
    }
  };

  const onSubmitEmail = (values: any) => {
    sendEmailVerificationCode({
      email: values.email,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(verify(data));
      setTimeout(() => openNotification("success"), 2000);
      setInfoSubmitted(true);
    }
    if (error) {
      openNotification("error");
      form.resetFields();
    }
  }, [data, error]);

  return (
    <>
      {!isInfoSubmitted && (
        <div className="flex flex-col">
          {contextHolder}
          <h3 className="my-5 self-center text-2xl font-semibold">
            Forgot password
          </h3>

          <Form
            layout="inline"
            form={form}
            style={{ maxWidth: "none" }}
            onFinish={onSubmitEmail}
            className="my-5 self-center"
          >
            <Form.Item
              label="Email"
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
              <Input placeholder="Email" type="email" />
            </Form.Item>
            {type == "change-password" && (
              <>
                <Form.Item
                  name="password"
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
                  name="password"
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
                  name="password"
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
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </Form.Item>
              </>
            )}
            {type == "forgot-password" && (
              <>
                <Form.Item
                  name="password"
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
                  name="password"
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
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
              />
            </Form.Item>
          </Form>
        </div>
      )}
      {isInfoSubmitted && <VerifyOTP />}
    </>
  );
};

export default EmailConfirmation;
