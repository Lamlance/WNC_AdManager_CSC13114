import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { useForm } from "antd/es/form/Form";
import { SendOutlined } from "@ant-design/icons";
import { useSendVerificationCodeMutation } from "../../slices/api/apiSlice";
import { notification } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../../slices/authSlice";

const ForgotPassword = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sendEmailVerificationCode, { data, error }] =
    useSendVerificationCodeMutation();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Verify failed!",
        description:
          JSON.stringify(error) ||
          "Cannot verify email right now!. Please check your email or contact your admin to get support.",
      });
    } else if (type == "success") {
      api[type]({
        message: "OTP code has been sent to you. Please check your email!",
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
      openNotification("success");
      navigate("/auth/verify-account");
    }
    if (error) {
      openNotification("error");
      form.resetFields();
    }
  }, [data, error]);

  return (
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
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
          name="email"
        >
          <Input
            placeholder="Input your email to receive OTP reset password!"
            type="email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
