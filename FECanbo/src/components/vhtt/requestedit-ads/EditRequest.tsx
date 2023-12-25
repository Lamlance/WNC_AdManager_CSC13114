import React, { useState } from "react";
import { EditAdRequest } from "../../../types";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "../EditAdForm";
import { AdChangeApi } from "@admanager/shared";
import { useGetAllAdChangeRequestQuery } from "../../../slices/api/apiSlice";

function EditRequest() {
  const { data } = useGetAllAdChangeRequestQuery();
  const [selectedAds, setSelectedAds] =
    useState<AdChangeApi.AdChangeRequestResponse | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<AdChangeApi.AdChangeRequestResponse> = [
    {
      title: "Lý do chỉnh sửa ",
      dataIndex: ["chinh_sua", "ly_do_chinh_sua"],
      key: "ly_do_chinh_sua",
    },
    {
      title: "Thông tin mới",
      key: "newinfo",
      width: "150px",
      align: "center",
      render: () => (
        <a
          className="text-blue-500 underline"
          onClick={() => setIsModalOpen(true)}
        >
          Xem chi tiết
        </a>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: ["chinh_sua", "trang_thai"],
      key: "trang_thai",
      align: "center",
    },
    {
      title: "Xét duyệt",
      width: "130px",
      key: "xetduyet",
      align: "center",

      render: () => <Button type="primary">Xét duyệt</Button>,
    },
    {
      title: "Từ chối",
      width: "130px",
      key: "newinfo",
      align: "center",

      render: () => (
        <Button type="primary" className="bg-red-500">
          Từ chối
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: AdChangeApi.AdChangeRequestResponse) => ({
          onClick: () => {
            setSelectedAds(record);
          },
        })}
      />
      {
        <EditAdForm
          isModalOpen={isModalOpen}
          onClose={closeModal}
          type="AdChange"
          ad={selectedAds ? selectedAds?.thong_tin_qc : null}
        />
      }
    </div>
  );
}

export default EditRequest;
