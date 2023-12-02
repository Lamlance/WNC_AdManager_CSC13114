import React, { useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import AdsDetail from "./AdsDetail";

function AdsInfor() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="ads-info-container">
      <EnvironmentOutlined onMouseEnter={handleMouseEnter} />

      {isHovered && (
        <div className="ads-info-popup" onMouseLeave={handleMouseLeave}>
          <div className="ads-info-content">
            <p className="text-xl font-bold">Trụ, cụm Pano</p>
            <p className="ads_info_location text-xl">
              42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu
            </p>
            <p className="text-xl">
              <span className="font-bold">Loại bảng: </span> Trụ bảng hiflex
            </p>
            <p className="text-xl">
              <span className="font-bold">Kích thước: </span> 2.5m x 10m
            </p>
            <p className="text-xl">
              <span className="font-bold">Hình thức: </span> Quảng cáo thương
              mại
            </p>
            <p className="text-xl">
              <span className="font-bold">Phân loại: </span> Nhà ở riêng lẻ
            </p>
            <p className="text-xl">
              <span className="font-bold">Số lượng: </span> 2 trụ/bảng
            </p>
            <p className="mt-1 text-xl font-bold italic">Đã quy hoạch</p>

            <AdsDetail />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdsInfor;
