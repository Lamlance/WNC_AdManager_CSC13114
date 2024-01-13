import VerifyOTP from "../components/auth/VerifyOTP";
import { useVerifyEmailMutation } from "../slices/api/apiSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

const VerifyAccountPage = () => {
  const [verifyEmail, { data, error }] = useVerifyEmailMutation();
  const [form] = useForm();

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Xác thực thất bại!",
        description:
          JSON.stringify(error) ||
          "Không thể xác thực email tại thời điểm hiện tại. Xin vui lòng liên hệ người quản lý của bạn để biết thêm thông tin chi tiết.",
      });
    } else if (type == "success") {
      api[type]({
        message: "Xác thực tài khoản thành công!",
      });
    }
  };

  const onFinish = (otpCode: string) => {
    if (authState.confirmToken) {
      verifyEmail({
        confirmToken: authState.confirmToken,
        code: otpCode,
      });
    }
  };

  useEffect(() => {
    if (data) {
      openNotification("success");
      setTimeout(() => navigate("/auth/login"), 2000);
    }
    if (error) {
      openNotification("error");
      form.resetFields();
    }
  }, [data, error]);

  return (
    <div className="flex items-center justify-center p-4">
      {contextHolder}
      <VerifyOTP callback={(code) => onFinish(code)} form={form} />
    </div>
  );
};

export default VerifyAccountPage;
