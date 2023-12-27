import React from "react";
import { AdsGeoJson } from "@admanager/shared";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllAdsMethodQuery } from "../slices/api/apiSlice";
type AdsMethod = AdsGeoJson.AdMethodProperty;

function AdsMethodPage() {
  const columns: ColumnsType<AdsMethod> = [
    {
      title: "#",
      dataIndex: "id_ht_qc",
      key: "id_ht_qc",
    },
    {
      title: "Hình thức quảng cáo",
      dataIndex: "adMethod",
      key: "hinh_thuc_qc",
    },

    {
      title: "",
      key: "operation",
      fixed: "right",

      render: () => (
        <a className="text-blue-500 underline" onClick={() => openModal()}>
          Xem chi tiết
        </a>
      ),
    },
    {
      title: "",
      key: "operation",
      fixed: "right",

      render: () => (
        <DeleteOutlined
          onClick={handleDeleteAd}
          style={{ color: "red", fontSize: "24px" }}
        />
      ),
    },
  ];

  const { data, error, isLoading } = useGetAllAdsMethodQuery();

  const handleAddAd = () => {};
  const handleDeleteAd = () => {};
  const openModal = () => {};
  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Button onClick={handleAddAd} type="primary" className="mb-3">
        Thêm hình thức quảng cáo
      </Button>
      <Table columns={columns} dataSource={data} />;
    </>
  );
}

export default AdsMethodPage;
