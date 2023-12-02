import React from "react";
import { Drawer } from "antd";
import { AdRequest } from "../types";

interface AdDetailsSectionProps {
  ad: AdRequest | null;
}

const AdDetailsSection: React.FC<AdDetailsSectionProps> = ({ ad }) => {
  return (
    <div>
      {ad ? (
        <div>
          <h2 className="font-semibold">CHI TIẾT YÊU CẦU</h2>
          
          <p>{ad.panoTitle}</p>
          <p>PANO ID: {ad.requestId}</p>
          <p>{ad.position}</p>
          <p>Công ty đặt quảng cáo: {ad.bookingAgency}</p>
          <p>Email: {ad.email}</p>
          <p>SĐT: {ad.phoneNumber}</p>
          <p>Địa chỉ: {ad.address}</p>
          <p>Thời gian đặt: {ad.rentalPeriod}</p>
          <p>Trạng thái: {ad.status}</p>
          <p>Nội dung: {ad.panoDetailedContent}</p>
          
        </div>
      ) : (
        <p>Please select an ad from the table.</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
