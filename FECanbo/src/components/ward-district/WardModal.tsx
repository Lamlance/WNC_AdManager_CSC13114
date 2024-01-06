import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

interface WardModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: { ten_phuong: string; id_quan: number }) => void;
  districtData: { id: number; ten_quan: string }[];
}

const WardModal: React.FC<WardModalProps> = ({
  visible,
  onCancel,
  onOk,
  districtData,
}) => {
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
              <Option key={district.id} value={district.id}>
                {district.ten_quan}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WardModal;
