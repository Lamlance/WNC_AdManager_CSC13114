import { AdsInfoRecord } from "../../types/view-model";

const AdsInfoDetail = ({
  id,
  adsType,
  address,
  sizeInfo,
  num,
  contentType,
  placeType,
  effDate,
  expDate,
  imageUrls
}: AdsInfoRecord) => {
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
      <h2 className="font-bold"> CHI TIẾT THÔNG TIN ĐIỂM QUẢNG CÁO </h2>
      <p>
        <span className="font-semibold"> Loại quảng cáo: </span>
        <span> {adsType} </span>
      </p>
      <p>
        <span className="font-semibold"> Địa điểm quảng cáo: </span>
        <span> {address} </span>
      </p>
      <p>
        <span className="font-semibold"> Kích thước: </span>
        <span> {sizeInfo} </span>
      </p>
      <p>
        <span className="font-semibold"> Số lượng: </span>
        <span> {num} </span>
      </p>
      <p>
        <span className="font-semibold"> Hình thức: </span>
        <span> {contentType} </span>
      </p>
      <p>
        <span className="font-semibold"> Điểm đặt: </span>
        <span> {placeType} </span>
      </p>
      <p>
        <span className="font-semibold"> Ngày hiệu lực: </span>
        <span className="italic"> {effDate} </span>
      </p>
      <p>
        <span className="font-semibold"> Ngày hết hạn: </span>
        <span className="italic"> {expDate} </span>
      </p>
    </div>
    
  );
};

export default AdsInfoDetail;
