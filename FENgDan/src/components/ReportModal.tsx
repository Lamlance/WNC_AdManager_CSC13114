import {
  ReportFormValues,
  ReportFormValuesSchema,
} from "@admanager/shared/types/ReportApi";
import { Modal, Form, Input, Select, Button } from "antd";
import QuillEditor from "./Quill/QuillEditor";
import Quill from "quill";
import React, { useRef } from "react";

const { Option } = Select;

interface ReportModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ReportFormValues) => void;
  reportFormValues?: ReportFormValues;
}

function ReportModal({
  visible,
  onCancel,
  onSubmit,
  reportFormValues,
}: ReportModalProps) {
  const [form] = Form.useForm();

  const quillRef = useRef<Quill | null>(null);

  const handleFinish = (values: ReportFormValues) => {
    let quillContent = "";
    if (quillRef.current) {
      quillContent = quillRef.current.root.innerHTML.trim();
    }
    const updatedValues = {
      ...values,
      noi_dung: quillContent,
    };
    const data = ReportFormValuesSchema.safeParse(updatedValues);
    // if (data.success) onSubmit(updatedValues);
    // else console.warn(data.error);

    form.resetFields();

    if (quillRef.current) {
      console.log(quillRef.current.root.innerHTML.trim());
    }

    console.log("Submit report clicked", updatedValues);
  };

  return (
    <Modal
      title={<div className="text-center text-xl font-bold">Đơn báo cáo</div>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="horizontal"
        initialValues={reportFormValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="overflow-scroll"
      >
        <Form.Item<ReportFormValues>
          name="id_loai_bc"
          label="Hình thức báo cáo"
          rules={[
            { required: true, message: "Please select the type of report" },
          ]}
        >
          <Select placeholder="Select type">
            <Option value={1}>Lỗi</Option>
            <Option value={2}>Nội dung không phù hợp</Option>
          </Select>
        </Form.Item>

        <Form.Item<ReportFormValues>
          name="ten_nguoi_gui"
          label="Họ và tên người báo cáo"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ReportFormValues>
          name="email"
          label="Email liên lạc"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item<ReportFormValues>
          name="dien_thoai"
          label="Điện thoại liên lạc"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex min-h-96 flex-col">
          <p>Nội dung báo cáo</p>
          <QuillEditor forwardedRef={quillRef} />
        </div>

        <Form.Item className="flex justify-center text-center">
          <Button type="primary" htmlType="submit">
            Nộp đơn
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ReportModal;
