// AdsModal.tsx
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface AdsModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: SubmitHandler<FieldValues>;
}

const AdsModal: React.FC<AdsModalProps> = ({ visible, onCancel, onSubmit }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  return (
    <Modal
      title="Enter Information"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Your Information"
          name="info"
          rules={[{ required: true, message: "Please enter your information!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdsModal;
