import { ReportApi } from "@admanager/shared";
import { Table } from "antd";
import { Link } from "react-router-dom";

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
    render: (record: string) => {
      return <div>{new Date(record).toLocaleString()}</div>;
    },
  },
  {
    title: "Trạng thái",
    dataIndex: ["bao_cao", "trang_thai"],
    key: "trang_thai",
  },
  {
    title: "Xem chi tiết",
    render: (r: ReportApi.ReportResponse) => {
      return <Link to={`/resolve/${r.bao_cao.id_bao_cao}`}>Chi tiết</Link>;
    },
  },
];

const ReportInfoTable = ({ data, onRowSelect }: ReportInfoTableProps) => {
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
