import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import { useLoginAccountMutation } from "../../slices/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { notification } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginAccount, { data, error }] = useLoginAccountMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Login Failed!",
        description:
          "Your username and password is incorrected! Please check again or register new account.",
      });
    } else if (type == "success") {
      api[type]({
        message: "Login Successfully!",
      });
    }
  };

  const onFinish = (values: any) => {
    loginAccount({
      username: values.username,
      pwd: values.password,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(login(data));
      openNotification("success");
      setTimeout(() => navigate("/"), 2000);
    }
    if (error) {
      openNotification("error");
      form.resetFields();
    }
  }, [data, error]);

  return (
    <div className="w-50 flex flex-col">
      {contextHolder}
      <h3 className="my-5 self-center text-2xl font-semibold"> Sign In </h3>
      <Form
        className="max-w-80"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="mx-1" />}
            placeholder="Username"
            name="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="mx-1" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Log in
          </Button>
        </Form.Item>
        <div className="my-2 flex">
          <div className="flex-1">
            Or <a href="register">register now!</a>
          </div>
          <div>
            <a href="forgot-password"> Forgot password? </a>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
