import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";

const LoginForm = () => {
  return (
    <div className="w-50 flex flex-col">
      <h3 className="font-semibold text-2xl self-center my-5"> Sign In </h3> 
      <Form className="max-w-80">
        <Form.Item>
          <Input
            prefix={<UserOutlined className="mx-1" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="mx-1" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="my-3">
            <Checkbox> Remember me </Checkbox>
            <div className="float-right">
              <a href="forgot-password"> Forgot password? </a>
            </div>
          </div>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Log in
          </Button>
          <div className="my-3">
            Or <a href="register">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
