import React from "react";
import { Table, Tag } from "antd"; 
import { AdRequest } from "../types";

const columns = [
  {
    title: "Pano ID",
    dataIndex: "requestId",
    key: "requestId",
    width: "10%",
  },
  {
    title: "NỘI DUNG PANO",
    dataIndex: "panoContent",
    key: "panoContent",
    width: "15%",
  },
  {
    title: "VỊ TRÍ ĐẶT",
    dataIndex: "position",
    key: "position",
    width: "20%",
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
    render: (status: string) => {
      let color;
      switch (status) {
        case "đang xử lý":
          color = "processing";
          break;
        case "đã phê duyệt":
          color = "success";
          break;
        case "đã hủy":
          color = "error";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const tableComponents = {
  header: {
    row: (props: any) => <tr {...props} style={{ textAlign: "center" }} />,
    cell: (props: any) => <th {...props} style={{ textAlign: "center" }} />,
  },
  body: {
    cell: (props: any) => <td {...props} style={{ textAlign: "center" }} />,
  },
};

interface AdsRequestTableProps {
  data: AdRequest[];
  onRowClick: (record: AdRequest) => void;
}

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({
  data,
  onRowClick,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      components={tableComponents}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AdsRequestTable;
