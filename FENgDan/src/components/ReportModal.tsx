import {
  ReportFormValues,
  ReportFormValuesSchema,
} from "@admanager/shared/types/ReportApi";
import { Modal, Form, Input, Select, Button, UploadFile } from "antd";
import QuillEditor from "./Quill/QuillEditor";
import Quill from "quill";
import React, { useRef, useState } from "react";
import PictureWallUpload from "./Quill/PictureWallUpload";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { checkValidFile } from "../utils/ImageUpload";

const { Option } = Select;

interface ReportModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ReportFormPropery) => void;
  reportFormValues?: ReportFormValues;
}

export type ReportFormPropery = ReportFormValues & {
  images?: UploadFile[];
};

function ReportModal({
  visible,
  onCancel,
  onSubmit,
  reportFormValues,
}: ReportModalProps) {
  const [form] = Form.useForm();
  const quillRef = useRef<Quill | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFinish = (values: ReportFormPropery) => {
    let quillContent = "";
    if (quillRef.current) {
      quillContent = quillRef.current.root.innerHTML.trim();
    }

    const updatedValues = {
      ...values,
      noi_dung: quillContent,
    };
    const data = ReportFormValuesSchema.safeParse(updatedValues);
    form.resetFields();
    if (data.success == false) return console.warn(data.error);
    // if (data.success) onSubmit(updatedValues);
    // else console.warn(data.error);

    onSubmit({
      ...data.data,
      images: fileList,
    });
  };

  const handleChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const onBeforeFileUpload: UploadProps["beforeUpload"] = (file) => {
    const res = checkValidFile(file);
    if (res.valid) return true;
    console.warn(res.msg);
    return false;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title={<div className="text-center text-xl font-bold">Đơn báo cáo</div>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={750}
    >
      <Form<ReportFormPropery>
        form={form}
        onFinish={handleFinish}
        layout="horizontal"
        initialValues={reportFormValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
      >
        <Form.Item<ReportFormPropery>
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

        <Form.Item<ReportFormPropery>
          name="ten_nguoi_gui"
          label="Tên người báo cáo"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ReportFormPropery>
          name="email"
          label="Email liên lạc"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item<ReportFormPropery>
          name="dien_thoai"
          label="Điện thoại liên lạc"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ReportFormPropery> name="images" label={"Hình ảnh minh họa"}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleChangeUpload}
          >
            {fileList.length >= 2 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <div className="flex min-h-72 flex-col">
          <p className="font mb-2 text-center text-base font-bold">
            Nội dung báo cáo
          </p>
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
