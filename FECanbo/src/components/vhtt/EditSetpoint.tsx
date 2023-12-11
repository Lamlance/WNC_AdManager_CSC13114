import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function EditSetpoint() {
  const billboard = [
    ["Chợ", "cau ket gian duong dai dao", "da quy hoach"],
    ["Chợ", "buon lau vu khi", "da quy hoach"],
    ["Chợ", "day ba gia xuong bien", "da quy hoach"],
    ["Chợ", "hiep dam 1 con heo", "da quy hoach"],
    [
      "Chợ",
      "Lâu gòi k gặp cháu lớn như vậy rồi hả, qua đây chú ôm cái đi , chú nhớ con quá đi",
      "chau tinh tri",
    ],
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title = "" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} className="max-w-2xl mt-8">
          <Form.Item label="Tên địa điểm">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input className="w-11/12"/> <SearchOutlined />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Hoàn thành
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>

  );
}

export default EditSetpoint;
