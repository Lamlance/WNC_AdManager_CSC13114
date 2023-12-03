import { Table } from "antd";

const columns = [
  {
    title: "Người báo cáo",
    dataIndex: "reporterInfo",
    key: "reporterInfo",
  },
  {
    title: "Địa chỉ quảng cáo",
    dataIndex: "adsAddress",
    key: "adsAddress",
  },
  {
    title: "Loại hình quảng cáo",
    dataIndex: "adsType",
    key: "adsType",
  },
  {
    title: "Loại hình báo cáo",
    dataIndex: "reportType",
    key: "reportType",
  },
  {
    title: "Thời gian báo cáo",
    dataIndex: "reportTime",
    key: "reportTime",
  },
  {
    title: "Trạng thái",
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