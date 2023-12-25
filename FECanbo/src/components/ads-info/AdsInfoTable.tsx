import { Button, Table } from "antd";
import { AdsInfoRecord } from "../../types/view-model";
import { AdsGeoJson } from "@admanager/shared";
import { ColumnsType } from "antd/es/table";

interface AdsInfoTableProps {
  data: (AdsGeoJson.AdsGeoJsonProperty & {
    loai_vi_tri: string;
  })[];
  onRowSelect: (data: AdsGeoJson.AdsGeoJsonProperty) => void;
  onRequestChangePlace: (data: AdsGeoJson.AdsGeoJsonProperty) => void;
}

const AdsInfoTable = ({
  data,
  onRowSelect,
  onRequestChangePlace,
}: AdsInfoTableProps) => {
  const columns: ColumnsType<AdsInfoTableProps["data"]> = [
    {
      title: "Tên địa điểm",
      dataIndex: ["place", "ten_dia_diem"],
      key: "ten_dia_diem",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["place", "dia_chi"],
      key: "dia_chi",
    },
    {
      title: "Loại vị trí",
      dataIndex: "loai_vi_tri",
      key: "loai_vi_tri",
    },
    {
      title: "Chỉnh sửa",
      fixed: "right",
      align: "center",
      render: (record: AdsGeoJson.AdsGeoJsonProperty) => (
        <a onClick={() => onRequestChangePlace(record)}>
          Yêu cầu chỉnh sửa điểm
        </a>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => onRowSelect(record),
        })}
        rowKey="id"
      />
    </>
  );
};

export default AdsInfoTable;
