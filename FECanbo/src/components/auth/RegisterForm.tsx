import Icon, {
  CheckCircleFilled,
  FileTextOutlined,
  FilterOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Popover, Select, Tag } from "antd";
import Button from "antd/es/button";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import { useState } from "react";
import { useGetAllWards } from "../../slices/api/apiSlice";

const RegisterForm = () => {
  const [data, error, isLoading ] = useGetAllWards();

  return (
    <div className="w-50 flex flex-col">
      <h3 className="my-5 self-center text-2xl font-semibold"> Register </h3>
      <Form className="max-w-80">
        <Form.Item>
          <Input
            prefix={<FileTextOutlined className="mx-1" />}
            placeholder="Fullname"
          />
        </Form.Item>
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
          <Input
            prefix={<LockOutlined className="mx-1" />}
            type="password"
            placeholder="Retype password"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MailOutlined className="mx-1" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<PhoneOutlined className="mx-1" />}
            type="phone"
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item label="Cấp tài khoản">
          <Select
            defaultValue="phuong"
            options={[
              { value: "phuong", label: "Cán bộ Phường" },
              { value: "quan", label: "Cán bộ Quận" },
              { value: "so", label: "Cán bộ Sở VH-TT" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Quận">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            defaultValue={[]}
            options={data.map((e) => {
              return { value: e, label: e };
            })}
          />
        </Form.Item>
        <Form.Item label="Phường">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            defaultValue={[]}
            options={data.map((e) => {
              return { value: e, label: e };
            })}
          />
        </Form.Item>
        <Form.Item>
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
