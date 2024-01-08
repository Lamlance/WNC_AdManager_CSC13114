import { Table } from "antd";
import {
  useGetAllPlaceInfoQuery,
  useLazyGetAllPlaceInfoQuery,
} from "../../../slices/api/apiSlice";
import { PlaceApi } from "@admanager/shared";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
interface PlaceInfoTableProps {
  onRowSelect?: (row: PlaceApi.PlaceProperty) => any;
}
function PlaceInfoTable(props: PlaceInfoTableProps) {
  const [getAllPlaceInfo, { data }] = useLazyGetAllPlaceInfoQuery();
  useEffect(() => {
    getAllPlaceInfo();
  }, []);
  const columns: ColumnsType<PlaceApi.GetAllPlaceResponse> = [
    {
      title: "id",
      dataIndex: ["place", "id_dia_diem"],
      key: "id_dia_diem",
    },
    {
      title: "Tên địa điểm",
      dataIndex: ["place", "ten_dia_diem"],
      key: "ten_dia_diem",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["place", "dia_chi"],
    },
    {
      title: "Thao tác",
      key: "Thao_tac",
      render: (_, r) => {
        return <a onClick={() => props.onRowSelect?.(r.place)}>Xem chi tiết</a>;
      },
    },
  ];

  return <Table columns={columns} dataSource={data?.data || []} />;
}

export default PlaceInfoTable;
