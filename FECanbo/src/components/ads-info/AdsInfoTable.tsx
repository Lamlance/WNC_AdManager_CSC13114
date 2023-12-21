import { Table } from "antd";
import { AdsInfoRecord } from "../../types/view-model";

interface AdsInfoTableProps {
  data: AdsInfoRecord[]
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
    title: "Kích thước",
    dataIndex: "sizeInfo",
    key: "sizeInfo",
  },
  {
    title: "Điểm đặt",
    dataIndex: "placeType",
    key: "placeType",
  },
  {
    title: "Hình thức",
    dataIndex: "contentType",
    key: "contentType",
  }
];

const AdsInfoTable = ({
  data
} : AdsInfoTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      // onRow={(record) => ({
      //   onClick: () => onRowClick(record),
      // })}
    />
  );
};

export default AdsInfoTable;