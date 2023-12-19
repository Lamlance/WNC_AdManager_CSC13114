// AdTable.tsx
import React from "react";
import { Table } from "antd";
import { AdRequest } from "../../types/view-model";

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
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "THỜI GIAN ĐẶT",
    dataIndex: "effectedDate",
    key: "effectedDate",
    render: (text: string, record: AdRequest) =>
      `${record.ngay_hieu_luc} - ${record.ngay_het_han}`,
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

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({
  data,
  onRowClick,
}) => {
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
