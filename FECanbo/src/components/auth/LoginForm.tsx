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
        message: "Đăng nhập thất bại!",
        description: "Tên đăng nhập hoặc mật khẩu không chính xác.",
      });
    } else if (type == "success") {
      api[type]({
        message: "Đăng nhập thành công!",
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
      <h3 className="my-5 self-center text-2xl font-semibold"> Đăng nhập </h3>
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
              message: "Hãy nhập tên đăng nhập!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="mx-1" />}
            placeholder="Tên đăng nhập"
            name="username"
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
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Đăng nhập
          </Button>
          <div className="my-2">
            <a href="/auth/forgot-password"> Quên mật khẩu </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
