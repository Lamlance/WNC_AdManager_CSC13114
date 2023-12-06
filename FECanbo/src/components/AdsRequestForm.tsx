import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
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

  const commonLabelCol = { span: 7 };
  const commonWrapperCol = { span: 17 };

  const uploadProps = {
    name: "file",
    action: "https://upload",
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal with Form
      </Button>

      <Modal
        title="TẠO YÊU CẦU CẤP PHÉP"
        visible={isModalVisible}
        width={1200}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish} layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh pano"
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                name="mapPosition"
                label="Chọn điểm đặt"
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <Input placeholder="Chọn điểm đặt" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                name="additionalInfo"
                label="Nội dung pano"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Thông tin quảng cáo"
            wrapperCol={commonWrapperCol}
          ></Form.Item>

          <Row gutter={16}>
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

          <Row gutter={16}>
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu hợp đồng"
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
                labelCol={commonLabelCol}
                wrapperCol={commonWrapperCol}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: commonLabelCol.span + 4, span: 20 }}>
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
