import { Button, Form, notification } from "antd";
import { InputOTP } from "antd-input-otp";
import { useForm } from "antd/es/form/Form";
import { useVerifyEmailMutation } from "../../slices/api/apiSlice";
import { useAppSelector } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const [verifyEmail, { data, error }] = useVerifyEmailMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Verify failed!",
        description:
          JSON.stringify(error) ||
          "Cannot verify account right now!. Please check your OTP or contact your admin to get support.",
      });
    } else if (type == "success") {
      api[type]({
        message:
          "Verify account successfully! Now login to access your account!",
      });
    }
  };

  const onFinish = (values: any) => {
    values.otp = values.otp.join("");

    console.log({
      confirmToken: authState.confirmToken,
      code: values.otp,
    })
    if (authState.confirmToken) {
      verifyEmail({
        confirmToken: authState.confirmToken,
        code: values.otp,
      });
    }
  };

  useEffect(() => {
    if (data) {
      openNotification("success");
      navigate("/auth/login");
    }
    if (error) {
      console.log(error);
      openNotification("error");
      form.resetFields();
    }
  }, [data, error]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="flex flex-col">
      {contextHolder}
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
                  return Promise.reject("Invalid OTP!");
                }
              },
              message: "Please input your OTP!",
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
