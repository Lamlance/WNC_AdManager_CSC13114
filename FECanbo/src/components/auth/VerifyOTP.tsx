import { Button, Form, } from "antd";
import { InputOTP } from "antd-input-otp";
import { FormInstance } from "antd/es/form/Form";

interface VerifyOTPProps {
  callback: (code: string) => void;
  form: FormInstance<any>;
}

const VerifyOTP = ({ callback, form }: VerifyOTPProps) => {
  const onFinish = (values: any) => {
    values.otp = values.otp.join("");
    callback(values.otp);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="flex flex-col">
      <h3 className="my-8 self-center text-2xl font-semibold">
        Input your OTP
      </h3>
      <Form
        form={form}
        style={{ minWidth: 500 }}
        {...layout}
        onFinish={onFinish}
        className="self-center"
        labelAlign="left"
      >
        <Form.Item
          name="otp"
          label="Input OTP: "
          rules={[
            {
              validator: (_, value) => {
                if (value.length === 6) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Mã OTP không hợp lệ!");
                }
              },
              message: "Hãy nhập mã OTP của bạn!",
            },
          ]}
        >
          <InputOTP
            inputType="numeric"
            length={6}
            inputStyle={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button htmlType="submit" type="primary" className="my-3">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOTP;
