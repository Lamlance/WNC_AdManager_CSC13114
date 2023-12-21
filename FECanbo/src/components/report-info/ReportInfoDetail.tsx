import { ReportInfoRecord } from "../../types/view-model";

const ReportInfoDetail = ({
  id,
  adsId,
  reporterInfo,
  reporterName, 
  reporterEmail,
  adsAddress,
  reporterPhone,
  reportType,
  reportContent,
  reportTime,
  status
}: ReportInfoRecord) => {
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
      <h2 className="font-bold"> CHI TIẾT THÔNG TIN BÁO CÁO </h2>
      <p> 
        <span className="font-semibold"> Họ tên người gửi: </span>
        <span> {reporterName} </span>
      </p>
      <p> 
        <span className="font-semibold"> Email: </span>
        <span> {reporterEmail} </span>
      </p>
      <p> 
        <span className="font-semibold"> Số điện thoại: </span>
        <span> {reporterPhone} </span>
      </p>
      <p> 
        <span className="font-semibold"> Nội dung báo cáo: </span>
        <p> {reportContent} </p>
      </p>
      <p> 
        <span className="font-semibold"> Địa điểm quảng cáo: </span> 
        <span> {adsAddress} </span> 
      </p>
      <p> 
        <span className="font-semibold"> Loại hình báo cáo: </span>
        <span> {reportType} </span>
      </p>
      <p> 
        <span className="font-semibold"> Thời điểm gửi: </span>
        <span> {reportTime} </span>
      </p>
      <p> 
        <span className="font-semibold"> Trạng thái: </span> 
        <span> {status} </span>
      </p>
    </div>
  );
};

export default ReportInfoDetail;
