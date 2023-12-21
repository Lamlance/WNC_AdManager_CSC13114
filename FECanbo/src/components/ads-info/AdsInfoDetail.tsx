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
  return (
    <div>
      <p>
        <span className="font-semibold"> Loại quảng cáo: </span>
        <span> {adsType} </span>
      </p>
      <p>
        <span className="font-semibold"> Địa điểm quảng cáo: </span>
        <span> {address} </span>
      </p>
      <p>
        <span> Kích thước: </span>
        <span> {sizeInfo} </span>
      </p>
      <p>
        <span> Số lượng: </span>
        <span> {num} </span>
      </p>
      <p>
        <span> Hình thức: </span>
        <span> {contentType} </span>
      </p>
      <p>
        <span> Điểm đặt: </span>
        <span> {placeType} </span>
      </p>
      <p>
        <span> Ngày hiệu lực: </span>
        <span> {effDate} </span>
      </p>
      <p>
        <span> Ngày hết hạn: </span>
        <span> {expDate} </span>
      </p>
    </div>
    
  );
};

export default AdsInfoDetail;
