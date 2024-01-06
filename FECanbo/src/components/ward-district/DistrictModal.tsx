import React from "react";
import { Modal, Form, Input } from "antd";

interface DistrictModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: { ten_quan: string }) => void;
}

function DistrictModal({ visible, onCancel, onOk }: DistrictModalProps) {
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
    <Modal
      title="Add District"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="ten_quan"
          label="Tên Quận"
          rules={[{ required: true, message: "Please enter district name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DistrictModal;
