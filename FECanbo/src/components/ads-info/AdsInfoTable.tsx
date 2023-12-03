import { Table } from "antd";

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

const AdsInfoTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={[]}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AdsInfoTable;