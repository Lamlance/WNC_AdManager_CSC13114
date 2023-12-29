// AdTable.tsx
import React from "react";
import { Table } from "antd";
import { AdRequest } from "../../../types";
import { AdsReqApi } from "@admanager/shared";
import { ColumnsType } from "antd/es/table";

interface AdsRequestTableProps {
  data: AdsReqApi.ManyAdsRequestResponse[];
  onRowClick: (record: AdsReqApi.ManyAdsRequestResponse) => void;
}

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({
  data,
  onRowClick,
}) => {
  const columns: ColumnsType<AdsReqApi.ManyAdsRequestResponse> = [
    {
      title: "Pano ID",
      dataIndex: ["yeu_cau", "id_yeu_cau"],
      key: "id_yeu_cau",
    },
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
      render: (_, record) =>
        `${(record.yeu_cau.ngay_hieu_luc as unknown as string).split("T")} - ${(
          record.yeu_cau.ngay_het_han as unknown as string
        ).split("T")}`,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: ["yeu_cau", "trang_thai"],
      key: "trang_thai",
    },
  ];

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
