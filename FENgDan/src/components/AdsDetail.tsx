import React, { useState } from "react";
import { Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface AdvertisementProps {
  id: string;
  type: string;
  location: string;
  detailType: string;
  size: { width: number; height: number };
  form: string;
  category: string;
  amount: number;
  planning: boolean;
}

const AdsDetail: React.FC = () => {
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
    <div style={{ textAlign: "center", fontSize: "32px" }}>
      <p>Chi tiết bảng quảng cáo</p>
    </div>
  );

  return (
    <div>
      <InfoCircleOutlined onClick={showModal} width={40} height={40} />
      <Modal
        title={customTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <p className="text-3" style={{ fontSize: "20px" }}>
          Trụ, cụm Pano
        </p>
        <p className="ads_detail_location" style={{ fontSize: "20px" }}>
          42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu
        </p>
        <p className="ads_detail_date_of_expiry" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span> 25/12/2024
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 1"
            style={{ marginRight: "10px", width: "500px", height: "300px" }}
          />
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 2"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdsDetail;
