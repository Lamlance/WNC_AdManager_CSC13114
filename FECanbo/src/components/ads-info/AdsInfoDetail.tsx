interface AdsInfoDetailProps {
  adsType: string;
  address: string;
  generalInfo: {
    size: {
      width: number;
      height: number;
    };
    number: number;
  };
  contentType: string;
  placeType: string;
  status: string;
}

const AdsInfoDetail = ({
  adsType,
  address,
  generalInfo,
  contentType,
  placeType,
  status,
}: AdsInfoDetailProps) => {
  return (
    <div>
      <p> Loại quảng cáo: {adsType} </p>
      <p> Địa điểm quảng cáo: {address} </p>
      <p>
        Kích thước: {generalInfo.size.width} x {generalInfo.size.height}
      </p>
      <p> Số lượng: {generalInfo.number} </p>
      <p> Hình thức: {contentType} </p>
      <p> Điểm đặt: {placeType} </p>
      <p> Trạng thái: {status} </p>
    </div>
  );
};

export default AdsInfoDetail;
