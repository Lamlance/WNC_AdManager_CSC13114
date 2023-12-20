import React, { FC, useEffect, useState } from "react";
import { Select, DatePicker, InputNumber, Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { AdsInfoRecord } from "../../types";

const { Option } = Select;
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
type SizeType = Parameters<typeof Form>[0]["size"];
const AdTableType = [
  "Trụ bảng hiflex",
  "Trụ màn hình điện tử LED",
  "Trụ hộp đèn",
  " Bảng hiflex ốp tường",
  "Màn hình điện tử ốp tường",
  "Trụ treo băng rôn dọc",
  "Trụ treo băng rôn ngang",
  "Trụ/Cụm pano",
  "Cổng chào",
  "Trung tâm thương mại",
];
const LocateType = [
  "Đất công/Công viên/Hành lang an toàn giao thông",
  "Đất tư nhân/Nhà ở riêng lẻ",
  "Trung tâm thương mại",
  "Chợ",
  "Cây xăng",
  "Nhà chờ xe buýt",
];
const AdType = ["Cổ động chính trị", "Quảng cáo thương mại", "Xã hội hoá"];
interface MyComponentProps {
  ad: AdsInfoRecord | null;
  isModalOpen: boolean;
  onClose: () => void;
}

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const today = dayjs().format("YYYY-MM-DD");

const EditAdForm: FC<MyComponentProps> = ({ ad, isModalOpen, onClose }) => {
  console.log("ad", ad);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    if (ad?.img) {
      setFileList([
        {
          uid: "1",
          name: "Image 1",
          status: "done",
          url: ad.img,
        },
      ]);
    } else {
      setFileList([]);
    }
    if (ad?.img2) {
      setFileList2([
        {
          uid: "2",
          name: "Image 2",
          status: "done",
          url: ad?.img2,
        },
      ]);
    } else {
      setFileList2([]);
    }
  }, [ad]);
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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleChange2: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList2(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleOk = () => {
    onClose();
  };

  const handleCancelModal = () => {
    onClose();
  };
  const [isOpen, setIsopen] = useState(false);
  useEffect(() => {
    setIsopen(isModalOpen);
  }, [isModalOpen]);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default",
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={null}
        className=" -my-12 mx-auto w-8/12 rounded-lg "
      >
        <h1 className=" mb-10 mt-5 text-center text-2xl font-semibold">
          {ad ? "CHỈNH SỬA BẢNG QUẢNG CÁO" : "THÊM BẢNG QUẢNG CÁO MỚI"}
        </h1>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          labelAlign="left"
        >
          <div className="grid grid-cols-2 gap-5  ">
            <Form.Item label=" Loại quảng cáo">
              <Select value={ad ? ad.adsType : null}>
                {AdTableType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label=" Hình thức">
              <Select value={ad?.contentType}>
                {AdType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label=" Phân loại">
              <Select value={ad?.placeType}>
                {LocateType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label=" Kích thước">
              <InputNumber
                className="h-8 w-12 "
                min={1}
                max={10}
                value={ad?.generalInfo.size.width}
              />
              <span className="mx-2">x</span>
              <InputNumber
                className="h-8 w-12"
                min={1}
                max={10}
                value={ad?.generalInfo.size.height}
              />
              <span className="mx-2">(mxm)</span>
            </Form.Item>
            <Form.Item label="Ngày hết hạn">
              <DatePicker
                value={dayjs(`${ad ? ad?.expireDate : today}`, dateFormat)}
                format={dateFormat}
              />
            </Form.Item>
            <Form.Item label="Số lượng">
              <InputNumber
                className="h-8 w-12 "
                min={1}
                max={10}
                value={ad?.generalInfo.number}
              />
              <span className="mx-2">trụ/bảng</span>
            </Form.Item>
            <Form.Item label="Hình ảnh 1">
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item label="Hình ảnh 2">
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange2}
              >
                {fileList2.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </div>
          <Form.Item
            label="Địa chỉ"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Input value={ad?.address} />
          </Form.Item>

          <Form.Item className="mt-5 flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditAdForm;
