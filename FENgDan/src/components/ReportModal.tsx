import {
  ReportFormValues,
  ReportFormValuesSchema,
} from "@admanager/shared/types/AdsGeoJson";
import { Modal, Form, Input, Select, Button } from "antd";

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

  const handleFinish = (values: ReportFormValues) => {
    const data = ReportFormValuesSchema.safeParse(values);
    if (data.success) onSubmit(values);
    form.resetFields();
    console.log("Submit report clicked", values);
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
      >
        <Form.Item<ReportFormValues>
          name="reportType"
          label="Hình thức báo cáo"
          rules={[
            { required: true, message: "Please select the type of report" },
          ]}
        >
          <Select placeholder="Select type">
            <Option value="issue">Lỗi</Option>
            <Option value="bad-content">Nội dung không phù hợp</Option>
          </Select>
        </Form.Item>

        <Form.Item<ReportFormValues>
          name="fullName"
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
          name="phoneNumber"
          label="Điện thoại liên lạc"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Nội dung báo cáo"
          rules={[{ required: true, message: "Please enter a description" }]}
          wrapperCol={{ span: 18 }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

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
