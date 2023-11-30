// AdTable.tsx
import React from "react";
import { Table } from "antd";
import { AdRequest } from "../src/types";

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

interface AdsRequestTableProps {
  data: AdRequest[];
  onRowClick: (record: AdRequest) => void;
}

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({ data, onRowClick }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AdsRequestTable;
