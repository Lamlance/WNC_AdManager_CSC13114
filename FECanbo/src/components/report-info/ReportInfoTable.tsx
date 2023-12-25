import { ReportApi } from "@admanager/shared";
import { Table } from "antd";

interface ReportInfoTableProps {
  data: ReportApi.ReportResponse[];
  onRowSelect: (data: ReportApi.ReportResponse) => void;
}

const columns = [
  {
    title: "Người báo cáo",
    dataIndex: ["bao_cao", "ten_nguoi_gui"],
    key: "ten_nguoi_gui",
  },
  {
    title: "Địa chỉ quảng cáo",
    dataIndex: ["bao_cao", "dia_chi"],
    key: "dia_chi",
  },
  {
    title: "Loại hình báo cáo",
    dataIndex: ["loai_bc"],
    key: "loai_bc",
  },
  {
    title: "Thời gian báo cáo",
    dataIndex: ["bao_cao", "thoi_diem_bc"],
    key: "thoi_diem_bc",
  },
  {
    title: "Trạng thái",
    dataIndex: ["bao_cao", "trang_thai"],
    key: "trang_thai",
  },
];

const ReportInfoTable = ({ data, onRowSelect }: ReportInfoTableProps) => {
  console.log("Report table data", data);
  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowSelect(record),
      })}
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default ReportInfoTable;
