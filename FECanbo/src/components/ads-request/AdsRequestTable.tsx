// AdTable.tsx
import React from "react";
import { Table } from "antd";
import { AdsReqApi } from "@admanager/shared";

const columns = [
  {
    title: "NỘI DUNG PANO",
    dataIndex: ["yeu_cau", "noi_dung_qc"],
    key: "noi_dung_qc",
  },
  {
    title: "CÔNG TY ĐẶT QUẢNG CÁO",
    dataIndex: ["yeu_cau", "ten_cty"],
    key: "ten_cty",
  },
  {
    title: "THỜI GIAN ĐẶT",
    key: "effectedDate",
    render: (v: AdsReqApi.ManyAdsRequestResponse) =>
      `${(v.yeu_cau.ngay_hieu_luc as unknown as string).split("T")[0]} - ${
        (v.yeu_cau.ngay_het_han as unknown as string).split("T")[0]
      }`,
  },
];

interface AdsRequestTableProps {
  data: AdsReqApi.ManyAdsRequestResponse[];
  onRowClick: (record: AdsReqApi.ManyAdsRequestResponse) => void;
}

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({
  data,
  onRowClick,
}) => {
  console.log(data);
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
