import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

type SizeType = Parameters<typeof Form>[0]["size"];
const OfficierType = ["Cán bộ quận", " Cán bộ phường"];
const DistricList = ["Quận 1", "Quận 2", "Quận 3", "Quận 4"];
const WardList = ["Phường 1", "Phường 2"];
function CreateAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default",
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { Option } = Select;

  const [officerTypeName, setOfficerTypeName] = useState("");

  const handleChange = (value: string) => {
    setOfficerTypeName(value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={null}
        className="mx-auto my-auto w-6/12 rounded-lg "
      >
        <h1 className=" mb-10 mt-5 text-center text-2xl font-semibold">
          TẠO TÀI KHOẢN
        </h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          labelAlign="left"
        >
          <div className="ml-4 grid grid-cols-2 gap-5  ">
            <Form.Item label="Loại cán bộ ">
              <Select onChange={handleChange}>
                {OfficierType.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="mb-5 font-bold">Khu vực quản lý </div>
          <div className="ml-4 grid grid-cols-2 gap-5  ">
            <Form.Item label="Chọn quận">
              <Select>
                {DistricList.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {officerTypeName == OfficierType[0] ? (
              <>
                <Form.Item label="Chọn phường">
                  <Select disabled>
                    {WardList.map((value) => {
                      return (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item label="Chọn phường">
                  <Select>
                    {WardList.map((value) => {
                      return (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </>
            )}
          </div>
          <div className="mb-5 font-bold">Thông tin tài khoản </div>
          <div className="ml-4 grid grid-cols-2 gap-5 ">
            {" "}
            <Form.Item
              label="Tên tài khoản"
              rules={[{ required: true, message: "Hãy nhập tên tài khoản" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item className="mt-5 flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              Hoàn thành
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateAccount;
