import React from "react";
import { AdRequest } from "../../../types";
import { Button } from "antd";

interface AdDetailsSectionProps {
  ad: AdRequest | null;
}

const AdDetailsSection: React.FC<AdDetailsSectionProps> = ({ ad }) => {
  const containerStyle = {
    padding: "10px",
    backgroundColor: "#DBF1EA",
    borderRadius: "8px",
  };

  const imageStyle = {
    marginBottom: "10px",
    img: {
      width: "100%",
      borderRadius: "4px",
    },
  };

  return (
    <div style={containerStyle}>
      {ad ? (
        <div>
          <h2 className="font-bold">CHI TIẾT YÊU CẦU</h2>
          <div style={imageStyle}>
            <img
              src="https://example.com/path/to/your/image.jpg"
              alt="Ads Img"
              style={imageStyle.img}
            />
          </div>
          <p className="ad-title">{ad.panoContent}</p>
          <p className="font-sans font-semibold">PANO ID: {ad.requestId}</p>
          <p className="font-sans font-light italic">{ad.position}</p>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.companyName}</span>
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
            <span>{ad.effectedDate}</span> - <span>{ad.expiredDate}</span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{ad.status}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.panoContent}</span>
          </p>
          <div className="my-3 flex justify-between">
            {ad.status == "Đã phê duyệt" ? (
              <Button className="bg-neutral-300" disabled type="primary">
                Phê duyệt
              </Button>
            ) : (
              <Button type="primary">Phê duyệt</Button>
            )}
            {ad.status == "Đã từ chối" ? (
              <Button disabled type="primary" className="bg-red-500">
                Từ chối
              </Button>
            ) : (
              <Button type="primary" className="bg-red-500">
                Từ chối
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p>Please select an ad from the table.</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
