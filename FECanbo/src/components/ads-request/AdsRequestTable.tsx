// AdTable.tsx
import React from "react";
import { Table } from "antd";
import { AdRequest } from "../../types/view-model";
import { AdsReqApi } from "@admanager/shared";

const columns = [
  // {
  //   title: "Pano ID",
  //   dataIndex: "requestId",
  //   key: "requestId",
  // },
  {
    title: "NỘI DUNG PANO",
    dataIndex: "adsContent",
    key: "adsContent",
  },
  // {
  //   title: "VỊ TRÍ ĐẶT",
  //   dataIndex: "position",
  //   key: "position",
  // },
  {
    title: "CÔNG TY ĐẶT QUẢNG CÁO",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "THỜI GIAN ĐẶT",
    dataIndex: "effectedDate",
    key: "effectedDate",
    render: (text: string, record: AdsReqApi.ManyAdsRequestResponse) =>
      `${record.effDate} - ${record.expDate}`,
  },
  // {
  //   title: "TRẠNG THÁI",
  //   dataIndex: "status",
  //   key: "status",
  // },
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
