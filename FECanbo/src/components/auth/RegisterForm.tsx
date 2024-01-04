import {
  FileTextOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Select, notification } from "antd";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import {
  useGetAllWards,
  useRegisterAccountMutation,
} from "../../slices/api/apiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../../slices/authSlice";

type DistrictElement = {
  districtId: number;
  districtName: string;
};

type WardElement = {
  wardId: number;
  wardName: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: wards } = useGetAllWards({});
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([]);
  const [registerAccount, { data: registerResponse, error }] =
    useRegisterAccountMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    if (type == "error") {
      api[type]({
        message: "Register failed!",
        description:
          JSON.stringify(error) ||
          "Cannot register account right now!. Contact your admin to check this error.",
      });
    } else if (type == "success") {
      api[type]({
        message:
          "Register successfully! Please check your email to get OTP to verify account!",
      });
    }
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success: ", values);

    registerAccount({
      username: values.username,
      pwd: values.password,
      name: values.name,
      phone: values.phone,
      email: values.email,
      accLevel: values.accLevel,
      managedDistricts: values.managedDistricts,
      managedWards: values.managedWards,
    });
  };

  useEffect(() => {
    if (registerResponse) {
      openNotification("success");
      console.log(registerResponse);
      dispatch(verify(registerResponse));
      navigate("/auth/verify-account");
    }
    if (error) {
      openNotification("error");
    }
  }, [registerResponse, error]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="w-50 flex flex-col">
      {contextHolder}
      <h3 className="my-5 self-center text-2xl font-semibold"> Register </h3>
      <Form
        form={form}
        {...layout}
        style={{ minWidth: 500 }}
        className="max-w-80"
        onFinish={onFinish}
        initialValues={{
          accLevel: "ward",
          managedDistricts: [],
          managedWards: [],
        }}
        autoComplete="off"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
          name="name"
          label="fullName"
        >
          <Input
            prefix={<FileTextOutlined className="mx-1" />}
            placeholder="Fullname"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          name="username"
          label="Username"
        >
          <Input
            prefix={<UserOutlined className="mx-1" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          name="password"
          label="Password"
        >
          <Input
            prefix={<LockOutlined className="mx-1" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!"),
                );
              },
            }),
          ]}
          name="confirmPassword"
          label="Retype password"
        >
          <Input
            prefix={<LockOutlined className="mx-1" />}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            }
          ]}
          name="email"
          label="Email"
        >
          <Input
            prefix={<MailOutlined className="mx-1" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email!",
            }
          ]}
          name="phone"
          label="Phone"
        >
          <Input
            prefix={<PhoneOutlined className="mx-1" />}
            type="phone"
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your account level!",
            },
          ]}
          label="Cấp tài khoản"
          name="accLevel"
        >
          <Select
            options={[
              { value: "ward", label: "Cán bộ Phường" },
              { value: "district", label: "Cán bộ Quận" },
              { value: "department", label: "Cán bộ Sở VH-TT" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Quận" name="managedDistricts">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select district"
            onChange={(values: number[]) => {
              setSelectedDistricts(values);
            }}
            options={(wards || [])
              .reduce((acc, item) => {
                if (!acc.map((i) => i.districtId).includes(item.quan.id_quan)) {
                  acc.push({
                    districtId: item.quan.id_quan,
                    districtName: item.quan.ten_quan,
                  });
                }
                return acc;
              }, [] as DistrictElement[])
              .map((e) => {
                return { value: e.districtId, label: e.districtName };
              })}
          />
        </Form.Item>
        <Form.Item label="Phường" name="managedWards">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select ward"
            options={(wards || [])
              .filter((e) => selectedDistricts.includes(e.quan.id_quan))
              .reduce((acc, item) => {
                if (!acc.map((i) => i.wardId).includes(item.phuong.id_phuong)) {
                  acc.push({
                    wardId: item.phuong.id_phuong,
                    wardName: item.phuong.ten_phuong,
                  });
                }
                return acc;
              }, [] as WardElement[])
              .map((e) => {
                return { value: e.wardId, label: e.wardName };
              })}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" className="w-full min-w-80">
            Register account
          </Button>
          <div className="my-3">
            Or <a href="login">login now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
