import React, { useState } from "react";
import {
  Select,
  Space,
  DatePicker,
  InputNumber,
  Form,
  Input,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
const { Option } = Select;
const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
function EditAdForm() {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="bg-gray-500">
      <div className="mx-auto my-auto w-8/12 rounded-lg bg-white">
        <div className="mr-4 cursor-pointer text-right text-3xl font-semibold ">
          x
        </div>
        <h1 className=" mb-10 mt-5 text-center text-3xl font-semibold">
          CHỈNH SỬA BẢNG QUẢNG CÁO
        </h1>

        <div className="grid grid-cols-2 gap-5 px-5 ">
          <div className=" flex">
            <div className="w-32 font-semibold">Loại quảng cáo : </div>
            <Space.Compact className=" w-2/3">
              <Select defaultValue="" style={{ width: "100%" }}>
                {AdTableType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Space.Compact>
          </div>
          <div className=" flex">
            <div className=" w-32 font-semibold">Phân loại : </div>
            <Space.Compact className=" w-2/3">
              <Select defaultValue="" style={{ width: "80%" }}>
                {LocateType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Space.Compact>
          </div>
          <div className=" flex">
            <div className=" w-32 font-semibold">Hình thức : </div>
            <Space.Compact className=" w-2/3">
              <Select defaultValue="" style={{ width: "100%" }}>
                {AdType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Space.Compact>
          </div>
          <div className=" flex">
            <div className=" w-32  font-semibold">Kích thước : </div>
            <InputNumber className="h-8 " min={1} max={10} />
            <span className="mx-2">x</span>
            <InputNumber className="h-8 " min={1} max={10} />
            <span className="mx-2">(mxm)</span>
          </div>
          <div className=" flex">
            <div className=" w-32 font-semibold">Ngày hết hạn : </div>
            <Form.Item className="" name="date-picker" {...config}>
              <DatePicker />
            </Form.Item>
          </div>
          <div className=" flex">
            <div className=" w-32 font-semibold">Số lượng : </div>
            <InputNumber className="h-8 " min={1} max={10} />

            <div className="ml-1">trụ/bảng</div>
          </div>
        </div>
        <div className=" flex px-5">
          <div className="w-32  font-semibold"> Địa chỉ : </div>
          <Input className="w-3/4" />
        </div>
        <div className="mt-5 flex px-5">
          <div className="w-40 font-semibold"> Hình ảnh : </div>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button type="primary">Hoàn thành </Button>
        </div>
      </div>
    </div>
  );
}

export default EditAdForm;
