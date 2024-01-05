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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../../slices/authSlice";
import WardList from "../FormComponents/WardFilter";
import { AuthApi } from "@admanager/shared";

type PhuongType = { id_phuong: number; ten_phuong: string; id_quan: number };

type DistrictElement = {
  districtId: number;
  districtName: string;
};

type WardElement = {
  wardId: number;
  wardName: string;
};
interface RegisterFormProps {
  overrideSubmit?: (values: AuthApi.RegisterRequest) => void;
  initalValue?: Partial<AuthApi.RegisterRequest>;
  checkedWardId?: number[];
}
const RegisterForm = (props: RegisterFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wardsRef = useRef<PhuongType[]>([]);
  const [currLevel, setLevel] =
    useState<AuthApi.RegisterRequest["accLevel"]>("ward");
  // const { data: wards } = useGetAllWards({});
  // const [selectedDistricts, setSelectedDistricts] = useState<number[]>([]);
  const [registerAccount, { data: registerResponse, error }] =
    useRegisterAccountMutation();
  const [api, contextHolder] = notification.useNotification();
  console.log(props.initalValue);
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

  const onFinish = (values: AuthApi.RegisterRequest) => {
    console.log("Success: ", values);

    const regiData: AuthApi.RegisterRequest = {
      username: values.username,
      pwd: values.pwd,
      name: values.name,
      phone: values.phone,
      email: values.email,
      accLevel: values.accLevel,
      managedDistricts: [],
      managedWards: wardsRef.current.map((v) => v.id_phuong),
    };
    if (props.overrideSubmit) {
      props.overrideSubmit(regiData);
      return;
    }
    registerAccount(regiData);
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

  useEffect(() => {
    if (props.initalValue) form.setFieldsValue(props.initalValue);
    else form.setFieldsValue({});
  }, [props.initalValue]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="w-50 grid grid-cols-2">
      <div className=" col-span-2">{contextHolder}</div>
      <h3 className="col-span-2 my-5 self-center text-2xl font-semibold">
        Register
      </h3>
      <Form<AuthApi.RegisterRequest>
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
        <Form.Item<AuthApi.RegisterRequest>
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
        <Form.Item<AuthApi.RegisterRequest>
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
        <Form.Item<AuthApi.RegisterRequest>
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          name="pwd"
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
                if (!value || getFieldValue("pwd") === value) {
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
        <Form.Item<AuthApi.RegisterRequest>
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
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
        <Form.Item<AuthApi.RegisterRequest>
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
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
        <Form.Item<AuthApi.RegisterRequest>
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
            onChange={(v: AuthApi.RegisterRequest["accLevel"]) => {
              setLevel(v);
            }}
            options={[
              { value: "ward", label: "Cán bộ Phường" },
              { value: "district", label: "Cán bộ Quận" },
              { value: "department", label: "Cán bộ Sở VH-TT" },
            ]}
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
      <div
        className={`flex flex-row gap-4 ${
          currLevel && currLevel !== "department" ? "" : "hidden"
        }`}
      >
        <WardList
          defaultCheckedWard={props.checkedWardId}
          wardIdsRef={wardsRef}
          showOnlyDistrict={currLevel === "district"}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
