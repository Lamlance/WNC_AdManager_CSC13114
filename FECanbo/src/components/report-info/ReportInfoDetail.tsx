interface ReportInfoDetailProps {
  reporterInfo: {
    name: string;
    phone: string;
  };
  adsAddress: string;
  reportType: string;
  reportTime: Date;
  status: string;
}

const ReportInfoDetail = ({
  reporterInfo,
  adsAddress,
  reportType,
  reportTime,
  status,
}: ReportInfoDetailProps) => {
  return (
    <div>
      <p> 
        <span> Tên người gửi: </span>
        <span> {reporterInfo.name} </span>
      </p>
      <p> 
        <span> Số điện thoại: </span>
        <span> {reporterInfo.phone} </span>
      </p>
      <p> 
        <span> Địa điểm quảng cáo: </span> 
        <span> {adsAddress} </span> 
      </p>
      <p> 
        <span> Loại hình báo cáo: </span>
        <span> {reportType} </span>
      </p>
      <p> 
        <span> Thời điểm gửi: </span>
        <span> {reportTime.toLocaleString()} </span>
      </p>
      <p> 
        <span> Trạng thái: </span> 
        <span> {status} </span>
      </p>
    </div>
  );
};

export default ReportInfoDetail;
