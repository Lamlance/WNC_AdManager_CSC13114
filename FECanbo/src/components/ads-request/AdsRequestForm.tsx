import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useSubmitAdRequestMutation } from "../../slices/api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { AdsReqApi } from "@admanager/shared";
import AdsMapModal from "../AdsMap/AdsMapModal";

const { TextArea } = Input;

interface AdsRequestFormProps {
  onCancel: () => void;
  isVisible: boolean;
}

type AdReqFormValue = AdsReqApi.AdRequestCreate;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AdsRequestForm: React.FC<AdsRequestFormProps> = ({
  isVisible,
  onCancel,
}) => {
  const [submitAdRequest, { isLoading }] = useSubmitAdRequestMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [isMapOpen, setMapOpen] = useState<boolean>(false);
  const [selectedLoc, setSelectedLoc] = useState<{
    lng: number;
    lat: number;
    formatted_address: string;
  } | null>(null);

  const handleCancelPreview = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  const handleChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const commonLabelCol = { span: 8 };
  const commonWrapperCol = { span: 12 };

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const onFinish = async (values: AdReqFormValue) => {
    values.ngay_het_han = (values.ngay_het_han as any)["$d"];
    values.ngay_hieu_luc = (values.ngay_hieu_luc as any)["$d"];
    const data = AdsReqApi.AdRequestCreateSchema.safeParse(values);
    console.log(values);
    if (data.success == false) return console.log(data.error);

    submitAdRequest(data.data).then((v) => console.log(v));
    handleOk();
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <AdsMapModal
        open={isMapOpen}
        onClose={() => {
          setMapOpen(false);
        }}
        initPos={{
          lng: 106.69385883068848,
          lat: 10.78873001700875,
        }}
        onPlaceSelect={(data) => {
          console.log(data);
          setSelectedLoc(data);
        }}
      />
      <Modal
        title="TẠO YÊU CẦU CẤP PHÉP"
        open={isVisible}
        width={1200}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish} layout="horizontal" labelAlign="left">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh pano"
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChangeUpload}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancelPreview}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
            </Col>

            <Col span={12}>
              <div className=" flex flex-row">
                <Form.Item
                  name="mapPosition"
                  label="Chọn điểm đặt"
                  // rules={[{ required: true, message: "Xin hãy chọn điểm đặt" }]}
                  labelCol={commonLabelCol}
                  wrapperCol={commonWrapperCol}
                  className=" flex-1"
                >
                  <Input
                    placeholder={
                      selectedLoc?.formatted_address || "Chọn điểm đặt"
                    }
                    disabled
                    value={selectedLoc?.formatted_address || ""}
                  />
                </Form.Item>
                <Button onClick={() => setMapOpen(true)}>🗺️</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={23}>
              <Form.Item<AdReqFormValue>
                name="noi_dung_qc"
                label="Nội dung pano"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 19 }}
              >
                <TextArea rows={5} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="ten_cty"
                label="Tên công ty"
                rules={[
                  { required: true, message: "Xin hãy nhập tên công ty!" },
                ]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="email_cty"
                label="Email"
                rules={[
                  { required: true, message: "Xin hãy nhập email công ty" },
                  {
                    type: "email",
                    message: "Xin hãy nhập email hợp lệ",
                  },
                ]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="dia_chi_cty"
                label="Địa chỉ"
                rules={[{ required: true, message: "Xin hãy nhập địa chỉ!" }]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="dien_thoai_cty"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Xin hãy nhập số điện thoại!" },
                ]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="ngay_hieu_luc"
                label="Ngày bắt đầu hợp đồng"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn ngày bắt đầu hợp đồng!",
                  },
                ]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<AdReqFormValue>
                name="ngay_het_han"
                label="Ngày kết thúc hợp đồng"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn ngày kết thúc hợp đồng!",
                  },
                ]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdsRequestForm;
