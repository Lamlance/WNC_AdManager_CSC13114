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
import dayjs from "dayjs";

const { TextArea } = Input;

interface AdsRequestFormProps {
  onCancel: () => void;
  isVisible: boolean;
}

type AdReqFormValue = Omit<
  AdsReqApi.AdRequestCreate & {
    ngay_bat_dau: dayjs.Dayjs;
    ngay_ket_thuc: dayjs.Dayjs;
  },
  "ngay_hieu_luc" | "ngay_het_han" | "hinh_anh"
>;

type GetImgBase64CallBack =
  | { success: true; url: string }
  | { success: false; error: any };
const GetImageBase64 = (
  file: RcFile,
  callBack: (data: GetImgBase64CallBack) => void,
) => {
  return {
    success: true,
    url: URL.createObjectURL(file),
  };
};

const checkValidFile = (
  file: RcFile,
): { valid: true } | { valid: false; msg: string } => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    return { valid: false, msg: "Must be jpeg/png file" };
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { valid: false, msg: "Image must smaller than 2MB!" };
  }
  return { valid: isJpgOrPng && isLt2M };
};

const AdsRequestForm: React.FC<AdsRequestFormProps> = ({
  isVisible,
  onCancel,
}) => {
  const [submitAdRequest, { isLoading }] = useSubmitAdRequestMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [isMapOpen, setMapOpen] = useState<boolean>(false);
  const [selectedLoc, setSelectedLoc] = useState<{
    lng: number;
    lat: number;
    formatted_address: string;
  } | null>(null);

  const setupPreviewImg = (file?: UploadFile) => {
    if (!file) {
      setPreviewImage(null);
      setPreviewTitle(null);
      return;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      return GetImageBase64(file.originFileObj, (data) => {
        if (data.success == false) return console.warn(data.error);
        file.preview = data.url;
        file.url = data.url;
        setupPreviewImg(file);
      });
    }
    setupPreviewImg(file);
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

  const commonLabelCol = { span: 8 };
  const commonWrapperCol = { span: 12 };

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const onFinish = async (values: AdReqFormValue) => {
    const submitData: AdsReqApi.AdRequestCreate = {
      ...values,
      dia_chi_qc: selectedLoc?.formatted_address || "",
      ngay_hieu_luc: values.ngay_bat_dau.toDate(),
      ngay_het_han: values.ngay_ket_thuc.toDate(),
    };
    const data = AdsReqApi.AdRequestCreateSchema.safeParse(submitData);
    if (data.success == false) return console.log(data.error);

    const formData = new FormData();
    Object.keys(data.data).forEach((k) => {
      const value = data.data[k as keyof AdsReqApi.AdRequestCreate];
      if (value) formData.append(k, value.toString());
    });

    for (let i = 0; i < fileList.length; i++) {
      const obj = fileList[i].originFileObj;
      if (obj) formData.append("hinh_anh", obj);
    }
    submitAdRequest(formData).then((v) => console.log(v));
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
        onClose={() => setMapOpen(false)}
        initPos={{ lng: 106.69385883068848, lat: 10.78873001700875 }}
        onPlaceSelect={(data) => setSelectedLoc(data)}
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
                label="Hình ảnh pano"
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                  onChange={handleChangeUpload}
                >
                  {fileList.length >= 2 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Modal
                open={!!previewImage}
                title={previewTitle}
                footer={null}
                onCancel={() => setupPreviewImg()}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage || ""}
                />
              </Modal>
            </Col>

            <Col span={12}>
              <div className=" flex flex-row">
                <Form.Item<AdReqFormValue>
                  name="dia_chi_qc"
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
                name="ngay_bat_dau"
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
                name="ngay_ket_thuc"
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
