import React, { useEffect, useState } from "react";
import { Button, Table, UploadFile } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm, { AdChangeFormValue } from "./EditAdForm";

import { DeleteOutlined } from "@ant-design/icons";
import {
  useGetAllAdsInfoQuery,
  useLazyGetAllAdsInfoQuery,
  useUpdateAdsInfoMutation,
} from "../../slices/api/apiSlice";
import { AdsGeoJson } from "@admanager/shared";

type AdsInfoRecord2 = AdsGeoJson.PlaceProperty & AdsGeoJson.AdsProperty;

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
      render(_, record) {
        return record.ngay_het_han
          ? new Date(record.ngay_het_han).toLocaleDateString()
          : "Không có ngày hết hạn";
      },
      key: "ngay_het_han",
    },

    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 110,
      render: (_, rec) => (
        <a
          className="text-blue-500 underline"
          onClick={() => {
            setSelectedAds(rec);
            openModal();
          }}
        >
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
  const [getAllAdsInfo, { data, error, isLoading }] =
    useLazyGetAllAdsInfoQuery();
  const [updateAdsInfo] = useUpdateAdsInfoMutation();
  const [selectedAds, setSelectedAds] = useState<AdsInfoRecord2 | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAds(null);
  };

  const handleAddAd = () => {
    setSelectedAds(null);
    setIsModalOpen(true);
  };

  const handleDeleteAd = () => {};

  useEffect(() => {
    getAllAdsInfo({});
  }, []);

  function handleUpdateAds(data: AdChangeFormValue) {
    if (!selectedAds) return;
    const formData = new FormData();
    Object.entries(data).forEach((d) => {
      if (d[0] === "hinh_anh") {
        (d[1] as UploadFile[]).forEach((u) => {
          if (u.originFileObj) formData.append("hinh_anh", u.originFileObj);
        });
        return;
      }

      if (d[1]) formData.append(d[0], d[1].toString());
    });
    formData.append("id_quang_cao", selectedAds.id_quang_cao);
    updateAdsInfo(formData).then(() => getAllAdsInfo({}));
  }

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
        onFormSubmit={handleUpdateAds}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        ad={selectedAds}
      />
    </>
  );
};

export default AdManagement;
