import React from "react";
import { AdRequest } from "../../types/view-model";
import { AdsReqApi } from "@admanager/shared";

interface AdDetailsSectionProps {
  ad: AdsReqApi.ManyAdsRequestResponse | null;
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
          <p className="ad-title line-clamp-1">{ad.adsContent}</p>
          <p className="font-sans font-semibold">PANO ID: {"No diem pano"}</p>
          <p className="font-sans font-light italic">{"No diem dat"}</p>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.companyName}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{ad.companyEmail}</span>
          </p>
          <p>
            <span className="font-semibold">SĐT: </span>
            <span>{ad.companyPhone}</span>
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            <span>{"No cty address"}</span>
          </p>
          <p>
            <span className="font-semibold">Thời gian đặt: </span>
            <span>{ad.effDate}</span> - <span>{ad.expDate}</span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{"No status"}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.adsContent}</span>
          </p>
        </div>
      ) : (
        <p>Please select an ad from the table.</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
