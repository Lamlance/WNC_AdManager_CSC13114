import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "./EditAdForm";
import { AdsInfoRecord } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllAdsInfoQuery } from "../../slices/api/apiSlice";

function convertAdsData(data: any[]): AdsInfoRecord[] {
  return data.map((item) => {
    const {
      ads: {
        id_quang_cao,
        id_dia_diem,
        so_luong,
        chieu_dai_m,
        chieu_rong_m,
        ngay_hieu_luc,
        ngay_het_han,
        hinh_1,
        hinh_2,
        quy_hoach,
      },
      place: { dia_chi },
      placeType: { loai_vitri },
      contentType: { hinh_thuc_qc },
      adsType: { loai_bang_qc },
    } = item;

    return {
      id: id_quang_cao,
      adsType: loai_bang_qc,
      address: dia_chi,
      generalInfo: {
        size: {
          width: chieu_rong_m,
          height: chieu_dai_m,
        },
        number: so_luong,
      },
      contentType: hinh_thuc_qc,
      placeType: loai_vitri,
      status: quy_hoach ? "Planned" : "Unplanned",
      effectDate: ngay_hieu_luc,
      expireDate: ngay_het_han,
      img: hinh_1,
      img2: hinh_2,
    };
  });
}
const AdManagement = () => {
  const columns: ColumnsType<AdsInfoRecord> = [
    {
      title: "ID quảng cáo",
      width: 200,
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
  const { data, error, isLoading } = useGetAllAdsInfoQuery();

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
  const convertedData = data ? convertAdsData(data) : [];

  const handleDeleteAd = () => {};
  return (
    <>
      {error && (
        <div>
          <p> There was an error </p>
        </div>
      )}
      {isLoading && (
        <div>
          <p> Loading page </p>
        </div>
      )}
      {data && (
        <>
          <Button onClick={handleAddAd} type="primary" className="mb-3">
            Thêm quảng cáo{" "}
          </Button>
          <Table
            columns={columns}
            dataSource={convertedData}
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
      )}
    </>
  );
};

export default AdManagement;
