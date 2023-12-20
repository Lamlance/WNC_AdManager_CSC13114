import React, { useState } from "react";
import { EditAdRequest } from "../../../types";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditAdForm from "../EditAdForm";
const data: EditAdRequest[] = [
  {
    id: "1",
    timeRequest: "2023-06-12",
    reason: "Thay đổi kích thước bảng quảng cáo",
    newinfo: {
      id: "1",
      adsType: "Trụ bảng hiflex",
      address: "Phường 6 quận 3",
      generalInfo: {
        size: {
          width: 5,
          height: 5,
        },
        number: 2,
      },
      contentType: "Cổ động chính trị",
      placeType: "Trung tâm thương mại",
      status: "đã xử lý",
      effectDate: "2023-06-12",
      expireDate: "2023-06-12",
      img: "https://chupgiare.com/wp-content/uploads/2023/02/Chup-Anh-quang-cao-Spa-de-lam-gi-hoangkhoiproduction.jpg",
      img2: "https://gtvseo.com/wp-content/uploads/2021/03/anh-quang-cao-facebook-la-gi.jpg",
    },
    status: "đã xử lý",
  },
  {
    id: "2",
    timeRequest: "2023-12-12",
    reason: "Cũng hổng biết lý do là gì nữa",
    newinfo: {
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
      status: "đã xử lý",
      effectDate: "2023-05-12",
      expireDate: "2023-05-12",
      img: "https://gtvseo.com/wp-content/uploads/2021/03/anh-quang-cao-facebook-la-gi.jpg",
      img2: "",
    },
    status: "chưa xử lý",
  },
];
function EditRequest() {
  const [selectedAds, setSelectedAds] = useState<EditAdRequest | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<EditAdRequest> = [
    {
      title: "ID yêu cầu",
      dataIndex: "id",
      key: "id",
      width: "100px",
      align: "center",
    },
    {
      title: "Lý do chỉnh sửa ",

      dataIndex: "reason",
      key: "reason",
      width: "300px",
    },

    {
      title: "Thời điểm chỉnh sửa",

      dataIndex: "timeRequest",
      key: "timeRequest",
      width: "180px",
      align: "center",
    },

    {
      title: "Thông tin mới",
      key: "newinfo",
      width: "150px",
      align: "center",
      render: () => (
        <a className="text-blue-500 underline" onClick={() => openModal()}>
          Xem chi tiết
        </a>
      ),
    },
    {
      title: "Trạng thái",
      width: "150px",
      dataIndex: "status",
      key: "status",
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
        onRow={(record) => ({
          onClick: () => {
            console.log("record", record);
            setSelectedAds(record);
          },
        })}
      />
      {selectedAds?.newinfo ? (
        <EditAdForm
          isModalOpen={isModalOpen}
          onClose={closeModal}
          ad={selectedAds?.newinfo}
        />
      ) : null}
    </div>
  );
}

export default EditRequest;
