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
          <h2 className="font-bold">CHI TIẾT YÊU CẦU</h2>
          <p>
            <img
              src="https://example.com/path/to/your/image.jpg"
              alt="Ads Img"
            />
          </p>
          <p>{ad.panoTitle}</p>
          <p className="font-sans font-semibold">PANO ID: {ad.requestId}</p>
          <p className="font-sans font-light italic">{ad.position}</p>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.bookingAgency}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{ad.email}</span>
          </p>
          <p>
            <span className="font-semibold">SĐT: </span>
            <span>{ad.phoneNumber}</span>
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            <span>{ad.address}</span>
          </p>
          <p>
            <span className="font-semibold">Thời gian đặt: </span>
            <span>{ad.rentalPeriod}</span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{ad.status}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.panoDetailedContent}</span>
          </p>
        </div>
      ) : (
        <p>Please select an ad from the table.</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
