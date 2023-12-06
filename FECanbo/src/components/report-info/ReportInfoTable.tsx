import { Table } from "antd";

const columns = [
  {
    title: "Pano ID",
    dataIndex: "requestId",
    key: "requestId",
  },
  {
    title: "NỘI DUNG PANO",
    dataIndex: "panoContent",
    key: "panoContent",
  },
  {
    title: "VỊ TRÍ ĐẶT",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "CÔNG TY ĐẶT QUẢNG CÁO",
    dataIndex: "bookingAgency",
    key: "bookingAgency",
  },
  {
    title: "THỜI GIAN ĐẶT",
    dataIndex: "rentalPeriod",
    key: "rentalPeriod",
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "status",
    key: "status",
  },
];

const ReportInfoTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={[]}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ReportInfoTable;