import { Table } from "antd";
import { ReportInfoRecord } from "../../types/view-model";

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

interface ReportInfoTableProps {
  data: ReportInfoRecord[];
}

const ReportInfoTable = ({
  data
} : ReportInfoTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      // onRow={(record) => ({
      //   onClick: () => onRowClick(record),
      // })}
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default ReportInfoTable;