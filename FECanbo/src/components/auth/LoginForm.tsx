import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";

const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="w-50 flex flex-col">
      <h3 className="my-5 self-center text-2xl font-semibold"> Sign In </h3>
      <Form className="max-w-80" form={form} onFinish={onFinish}>
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
