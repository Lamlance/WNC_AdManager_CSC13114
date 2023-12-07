import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ModalFormAntDesignExample: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    handleOk();
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        TẠO YÊU CẦU CẤP PHÉP
      </Button>

      <Modal
        title="TẠO YÊU CẦU CẤP PHÉP"
        visible={isModalVisible}
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
              <Form.Item
                name="mapPosition"
                label="Chọn điểm đặt"
                rules={[{ required: true, message: "Xin hãy chọn điểm đặt" }]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input placeholder="Chọn điểm đặt" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={23}>
              <Form.Item
                name="additionalInfo"
                label="Nội dung pano"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 19 }}
              >
                <TextArea rows={5} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Thông tin quảng cáo"
            wrapperCol={commonWrapperCol}
          ></Form.Item>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                name="companyName"
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
              <Form.Item
                name="email"
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
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Xin hãy nhập địa chỉ!" }]}
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
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
              <Form.Item
                name="startDate"
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
              <Form.Item
                name="endDate"
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

          <Form.Item className="items-center flex justify-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalFormAntDesignExample;
