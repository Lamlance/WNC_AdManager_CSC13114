import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;
type Ward = {
  id_phuong: number;
  ten_phuong: string;
  id_quan: number;
};
type District = {
  id_quan: number;
  ten_quan: string;
};
interface WardModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: { ten_phuong: string; id_quan: number }) => void;
  districtData: { quan: District }[];
}

function WardModal({ visible, onCancel, onOk, districtData }: WardModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onOk(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal title="Add Ward" open={visible} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="ten_phuong"
          label="Tên Phường"
          rules={[{ required: true, message: "Please enter ward name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="id_quan"
          label="District"
          rules={[{ required: true, message: "Please select district" }]}
        >
          <Select>
            {districtData.map((district) => (
              <Option key={district.quan.id_quan} value={district.quan.id_quan}>
                {district.quan.ten_quan}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default WardModal;
