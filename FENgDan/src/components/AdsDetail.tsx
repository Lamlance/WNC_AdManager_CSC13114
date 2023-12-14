import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";

function AdsDetail() {
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

  const customTitle = (
    <div className="text-center text-2xl">
      <p>Chi tiết bảng quảng cáo</p>
    </div>
  );

  return (
    <div>
      <InfoCircleOutlined
        onClick={showModal}
        className="h-10 w-10 cursor-pointer"
      />
      <Modal
        title={customTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <p className=" text-2xl">Trụ, cụm Pano</p>
        <p className=" text-xl">42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu</p>
        <p className=" text-xl">
          <span className=" font-bold">Ngày hết hạn:</span> 25/12/2024
        </p>

        <div className="mt-5 flex justify-center">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 1"
            className="h-50 w-120 mr-10"
          />
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 2"
            className="h-50 w-120"
          />
        </div>
      </Modal>
    </div>
  );
}

export default AdsDetail;
