import React from "react";
import { AdRequest } from "../../types/view-model";

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
          <p className="ad-title">{ad.noi_dung_qc}</p>
          <p className="font-sans font-semibold">PANO ID: {ad.id_diem_dat}</p>
          <p className="font-sans font-light italic">{ad.id_diem_dat}</p>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.ten_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{ad.email_cty}</span>
          </p>
          <p>
            <span className="font-semibold">SĐT: </span>
            <span>{ad.dien_thoai_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            <span>{ad.dia_chi_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Thời gian đặt: </span>
            <span>{ad.ngay_hieu_luc}</span> - <span>{ad.ngay_het_han}</span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{ad.trang_thai}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.noi_dung_qc}</span>
          </p>
        </div>
      ) : (
        <p>Please select an ad from the table.</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
