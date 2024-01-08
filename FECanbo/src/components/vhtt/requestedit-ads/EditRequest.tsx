import React, { useEffect, useState } from "react";

import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "../EditAdForm";
import { AdChangeApi } from "@admanager/shared";
import {
  useGetAllAdChangeRequestQuery,
  useSubmitUpdateAdChangeRequestStatusMutation,
} from "../../../slices/api/apiSlice";

function EditRequest() {
  const { data } = useGetAllAdChangeRequestQuery();
  const [selectedAds, setSelectedAds] =
    useState<AdChangeApi.AdChangeRequestResponse | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
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

      render: () => (
        <Button type="primary" onClick={handleApprove}>
          Xét duyệt
        </Button>
      ),
    },
    {
      title: "Từ chối",
      width: "130px",
      key: "newinfo",
      align: "center",

      render: () => (
        <Button type="primary" className="bg-red-500" onClick={handleReject}>
          Từ chối
        </Button>
      ),
    },
  ];
  const [submitAdChangeStatus] = useSubmitUpdateAdChangeRequestStatusMutation();

  useEffect(() => {
    if (isApprove) {
      const data: AdChangeApi.AdChangeStatusRequestUpdate = {
        id_yeu_cau: selectedAds!.chinh_sua.id_yeu_cau,
        trang_thai: "Approve",
      };

      submitAdChangeStatus(data).then((v) => console.log(v));
      window.location.reload();
    }
    if (isReject) {
      const data: AdChangeApi.AdChangeStatusRequestUpdate = {
        id_yeu_cau: selectedAds!.chinh_sua.id_yeu_cau,
        trang_thai: "Reject",
      };

      submitAdChangeStatus(data).then((v) => console.log(v));
      window.location.reload();
    }
  }, [selectedAds, isApprove, isReject]);
  const handleApprove = () => {
    setIsApprove(true);
  };
  const handleReject = () => {
    setIsReject(true);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: AdChangeApi.AdChangeRequestResponse) => ({
          onClick: () => {
            console.log("ggg", record);
            setSelectedAds(record);
          },
        })}
      />
      {
        <EditAdForm
          isModalOpen={isModalOpen}
          onClose={closeModal}
          type="AdChange"
          ad={selectedAds ? selectedAds?.chinh_sua.thong_tin_sua : null}
        />
      }
    </div>
  );
}

export default EditRequest;
