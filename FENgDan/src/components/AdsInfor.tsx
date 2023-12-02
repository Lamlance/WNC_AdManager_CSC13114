import React, { useState } from "react";
import { Modal } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import AdsDetail from "./AdsDetail";

const AdsInfor: React.FC = () => {
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
      <EnvironmentOutlined onClick={showModal} />
      <Modal
        title={customTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <p
          className="ads_info_type"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Trụ, cụm Pano
        </p>
        <p className="ads_info_location" style={{ fontSize: "20px" }}>
          42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu
        </p>
        <p className="ads_info_type" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Loại bảng: </span> Trụ bảng
          hiflex
        </p>
        <p className="ads_info_size" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Kích thước: </span> 2.5m x 10m
        </p>
        <p className="ads_info_form" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Hình thức: </span> Quảng cáo
          thương mại
        </p>
        <p className="ads_info_type" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Phân loại: </span> Nhà ở riêng lẻ
        </p>
        <p className="ads_info_amount" style={{ fontSize: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Số lượng: </span> 2 trụ/bảng
        </p>
        <p
          className="ads_info_planning"
          style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic" }}
        >
          Đã quy hoạch
        </p>

        <AdsDetail />
      </Modal>
    </div>
  );
};

export default AdsInfor;
