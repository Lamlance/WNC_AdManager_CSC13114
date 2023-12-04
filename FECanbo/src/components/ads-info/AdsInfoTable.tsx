import { Table } from "antd";
import { AdsInfoRecord } from "../../types";

interface AdsInfoTableProps {
  data: AdsInfoRecord[],
  onRowClick: (record: AdsInfoRecord) => void;
}

const columns = [
  {
    title: "Loại hình quảng cáo",
    dataIndex: "adsType",
    key: "adsType",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Thông tin chung",
    dataIndex: "generalInfo",
    key: "generalInfo",
  },
  {
    title: "Điểm đặt",
    dataIndex: "placeType",
    key: "placeType",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  }
];

const AdsInfoTable = ({
  data,
  onRowClick
} : AdsInfoTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
};

export default AdsInfoTable;