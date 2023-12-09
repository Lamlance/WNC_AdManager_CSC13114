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
      <p> Tên người gửi: {reporterInfo.name} </p>
      <p> Số điện thoại: {reporterInfo.phone} </p>
      <p> Địa điểm quảng cáo: {adsAddress} </p>
      <p> Loại hình báo cáo: {reportType} </p>
      <p> Thời điểm gửi: {reportTime.toLocaleString()} </p>
      <p> Trạng thái: {status} </p>
    </div>
  );
};

export default ReportInfoDetail;
