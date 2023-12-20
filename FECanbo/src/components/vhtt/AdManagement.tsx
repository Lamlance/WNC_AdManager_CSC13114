import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "./EditAdForm";
import { AdsInfoRecord } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";

const data: AdsInfoRecord[] = [
  {
    id: "1",
    adsType: "Trụ bảng hiflex",
    address: "Phường 6 quận 3",
    generalInfo: {
      size: {
        width: 2,
        height: 3,
      },
      number: 2,
    },
    contentType: "Cổ động chính trị",
    placeType: "Trung tâm thương mại",
    status: "pending",
    effectDate: "2023-06-12",
    expireDate: "2023-06-12",
    img: "https://chupgiare.com/wp-content/uploads/2023/02/Chup-Anh-quang-cao-Spa-de-lam-gi-hoangkhoiproduction.jpg",
    img2: "https://gtvseo.com/wp-content/uploads/2021/03/anh-quang-cao-facebook-la-gi.jpg",
  },
  {
    id: "2",
    adsType: "Trụ treo băng rôn dọc",
    address: "Phường 7 quận 3",
    generalInfo: {
      size: {
        width: 2.5,
        height: 3.5,
      },
      number: 1,
    },
    contentType: "Quảng cáo thương mại",
    placeType: "Nhà chờ xe buýt",
    status: "pending",
    effectDate: "2023-05-12",
    expireDate: "2023-05-12",
    img: "https://gtvseo.com/wp-content/uploads/2021/03/anh-quang-cao-facebook-la-gi.jpg",
    img2: "",
  },
];

const AdManagement = () => {
  const columns: ColumnsType<AdsInfoRecord> = [
    {
      title: "ID quảng cáo",
      width: 120,
      dataIndex: "id",
      key: "id",
      fixed: "left",
      align: "center",
    },
    {
      title: "Loại bảng quảng cáo",
      width: 200,
      dataIndex: "adsType",
      key: "id_loai_bang_qc",
    },
    {
      title: "Vị trí",
      width: 200,
      dataIndex: "address",
      key: "id_dia_diem",
    },
    {
      title: "Kích thước (mxm)",
      dataIndex: ["generalInfo", "size"],
      width: 100,
      key: "size",
      align: "center",
      render: (size) => `${size.width} x ${size.height}`,
    },
    {
      title: "Số lượng",
      width: 100,
      dataIndex: ["generalInfo", "number"],
      key: "number",
      align: "center",
    },
    { title: "Hình thức", dataIndex: "contentType", key: "id_hinh_thuc" },
    { title: "Phân loại", dataIndex: "placeType", key: "id_loai_vitri" },

    {
      title: "Ngày hết hạn",
      width: 120,
      dataIndex: "expireDate",
      key: "ngay_het_han",
    },

    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 110,
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
      width: 60,
      render: () => (
        <DeleteOutlined
          onClick={handleDeleteAd}
          style={{ color: "red", fontSize: "24px" }}
        />
      ),
    },
  ];
  const [selectedAds, setSelectedAds] = useState<AdsInfoRecord | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddAd = () => {
    setSelectedAds(null);
    setIsModalOpen(true);
  };
  const handleDeleteAd = () => {};
  return (
    <>
      <Button onClick={handleAddAd} type="primary" className="mb-3">
        Thêm quảng cáo{" "}
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1300 }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedAds(record);
          },
        })}
      />
      <EditAdForm
        isModalOpen={isModalOpen}
        onClose={closeModal}
        ad={selectedAds}
      />
    </>
  );
};

export default AdManagement;
