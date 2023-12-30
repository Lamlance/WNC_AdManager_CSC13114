import Icon from "@ant-design/icons";
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
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="my-3">
            <Checkbox> Remember me </Checkbox>
            <a className="float-right" href="auth/forgot-password">
              Forgot password?
            </a>
          </div>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Log in
          </Button>
          <div className="my-3">
            Or <a href="auth/register">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
