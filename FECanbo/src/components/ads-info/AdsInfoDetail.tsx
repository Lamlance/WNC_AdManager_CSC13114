import { AdsInfoRecord } from "../../types";

const AdsInfoDetail = ({
  adsType,
  address,
  generalInfo,
  contentType,
  placeType,
  status,
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
        <span>
          {generalInfo.size.width} x {generalInfo.size.height}{" "}
        </span>
      </p>
      <p>
        <span> Số lượng: </span>
        <span> {generalInfo.number} </span>
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
        <span> Trạng thái: </span> 
        <span> {status} </span>
      </p>
    </div>
  );
};

export default AdsInfoDetail;
