import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { InputOTP } from "antd-input-otp";
import { useSendVerificationCodeMutation } from "../../slices/api/apiSlice";
import { useForm } from "antd/es/form/Form";
import { SendOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const [form] = useForm();

  const { data, error, isLoading } = useSendVerificationCodeMutation({});

  const onSubmitEmail = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className="flex flex-col">
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

      {data && (
        <div className="flex flex-col">
          <h3 className="my-5 self-center text-2xl font-semibold">Input your OTP</h3>
          <Form form={form} layout="vertical">
            <Form.Item name="otp">
              <InputOTP
                inputType="numeric"
                length={6}
                inputStyle={{ height: "50px" }}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
