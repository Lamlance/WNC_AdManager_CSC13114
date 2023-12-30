import Icon from "@ant-design/icons";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";

const RegisterForm = () => {
  return (
    <div className="w-50 flex flex-col">
      <h3 className="font-semibold text-2xl self-center my-5"> Register </h3> 
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
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="retype-password"
            placeholder="Retype password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Register account
          </Button>
          <div className="my-3">
            Or <a href="auth/login">login now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;