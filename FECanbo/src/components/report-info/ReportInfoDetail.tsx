import { ReportInfoRecord } from "../../types/view-model";

const ReportInfoDetail = ({
  id,
  adsId,
  reporterInfo,
  adsAddress,
  reporterPhone,
  reportType,
  reportContent,
  reportTime,
  status
}: ReportInfoRecord) => {
  return (
    <div>
      <p> 
        <span> Thông tin người gửi: </span>
        <span> {reporterInfo} </span>
      </p>
      <p> 
        <span> Số điện thoại: </span>
        <span> {reporterPhone} </span>
      </p>
      <p> 
        <span> Nội dung báo cáo </span>
        <span> {reportContent} </span>
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
        <span> {reportTime} </span>
      </p>
      <p> 
        <span> Trạng thái: </span> 
        <span> {status} </span>
      </p>
    </div>
  );
};

export default ReportInfoDetail;
