import { ReportApi } from "@admanager/shared";
import { ReportInfoRecord } from "../../types/view-model";

const ReportInfoDetail = ({ bao_cao, loai_bc }: ReportApi.ReportResponse) => {
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
        <span> {bao_cao.ten_nguoi_gui} </span>
      </p>
      <p>
        <span className="font-semibold"> Email: </span>
        <span> {bao_cao.email} </span>
      </p>
      <p>
        <span className="font-semibold"> Số điện thoại: </span>
        <span> {bao_cao.dien_thoai} </span>
      </p>
      <p>
        <span className="font-semibold"> Nội dung báo cáo: </span>
        <span dangerouslySetInnerHTML={{ __html: bao_cao.noi_dung }}></span>
      </p>
      <p>
        <span className="font-semibold"> Địa điểm quảng cáo: </span>
        <span> {bao_cao.dia_chi} </span>
      </p>
      <p>
        <span className="font-semibold"> Loại hình báo cáo: </span>
        <span> {loai_bc} </span>
      </p>
      <p>
        <span className="font-semibold"> Thời điểm gửi: </span>
        <span> {`${bao_cao.thoi_diem_bc}`} </span>
      </p>
      <p>
        <span className="font-semibold"> Trạng thái: </span>
        <span> {bao_cao.trang_thai} </span>
      </p>
    </div>
  );
};

export default ReportInfoDetail;
