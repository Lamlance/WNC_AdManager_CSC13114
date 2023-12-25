import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "./EditAdForm";
import { AdsInfoRecord } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllAdsInfoQuery } from "../../slices/api/apiSlice";
import { AdsGeoJson } from "@admanager/shared";

type AdsInfoRecord2 = AdsGeoJson.PlaceProperty & AdsGeoJson.AdsProperty;

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

function convertAdsData2(
  data: AdsGeoJson.AdsGeoJsonProperty[],
): AdsInfoRecord2[] {
  const newData: AdsInfoRecord2[] = [];
  data.forEach((d) => d.ads.forEach((a) => newData.push({ ...a, ...d.place })));
  return newData;
}

const AdManagement = () => {
  const columns: ColumnsType<AdsInfoRecord2> = [
    {
      title: "Loại bảng quảng cáo",
      dataIndex: "bang_qc",
      key: "bang_qc",
    },
    {
      title: "Vị trí",
      dataIndex: "ten_dia_diem",
      key: "ten_dia_diem",
    },
    {
      title: "Kích thước (mxm)",
      align: "center",
      render: (data: AdsInfoRecord2) =>
        data?.chieu_dai_m && data?.chieu_rong_m
          ? `${data?.chieu_dai_m}m x ${data?.chieu_rong_m}m`
          : "Không có thông tin",
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      key: "so_luong",
      align: "center",
    },
    { title: "Hình thức", dataIndex: "hinh_thuc", key: "hinh_thuc" },
    { title: "Phân loại", dataIndex: "loai_vitri", key: "loai_vitri" },

    {
      title: "Ngày hết hạn",
      dataIndex: "ngay_het_han",
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

  const [selectedAds, setSelectedAds] = useState<AdsInfoRecord2 | null>(null);

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
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Button onClick={handleAddAd} type="primary" className="mb-3">
        Thêm quảng cáo{" "}
      </Button>
      <Table
        pagination={{ pageSize: 4 }}
        columns={columns}
        dataSource={data ? convertAdsData2(data) : []}
        scroll={{ x: 1300 }}
        onRow={(record) => ({
          onClick: () => {
            setSelectedAds(record);
          },
        })}
      />
      <EditAdForm
        type="AdInfo"
        isModalOpen={isModalOpen}
        onClose={closeModal}
        ad={selectedAds}
      />
    </>
  );
};

export default AdManagement;
