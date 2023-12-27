import { Table } from "antd";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useDispatch } from 'react-redux';

import EditSetpoint from "./EditSetpoint";
import { showModalOpen } from "../../slices/modalSlice.tsx";
import { onChangeLocation, onChangeAddress, setLng, setLat } from "../../slices/pointSlice.tsx";
import { EditRequest } from "../../types.ts";

const data: EditRequest[] = [
    { "id": "1", "location": "agribank", "sender": "phuong cau ong lanh quan 1", "address": "159 nguyen thai hoc", "reason": "cau ket gian duong dai dao", lng: 10, lat: 100, "status": "da chinh sua" },
    { "id": "2", "location": "agribank", "sender": "phuong cau ong lanh", "address": "159 nguyen thai hoc", "reason": "cau ket gian duong dai dao", lng: 10, lat: 100, "status": "da chinh sua" },
    { "id": "3", "location": "agribank", "sender": "phuong cau ong quan 1", "address": "159 nguyen thai hoc", "reason": "cau ket gian duong dai dao", lng: 10, lat: 100, "status": "da chinh sua" },
    { "id": "4", "location": "agribank", "sender": "phuong c lanh quan 1", "address": "159 nguyen thai hoc", "reason": "cau ket gian duong dai dao", lng: 10, lat: 100, "status": "da chinh sua" },
];

function EditRequestComponent() {

    const dispatch = useDispatch();

    const showModal = (record: EditRequest) => {
        dispatch(onChangeLocation(record.location));
        dispatch(onChangeAddress(record.address));
        // dispatch(setLng(record.lng));
        // dispatch(setLat(record.lat));
        dispatch(showModalOpen());
    };

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Đơn vị gửi yêu cầu",
            dataIndex: "sender",
            key: "sender",
        },
        {
            title: "Địa điểm",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Nội dung",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "",
            dataIndex: "detail",
            key: "detail",
            render: ((text: string, record: EditRequest) => (<Link to='#' onClick={() => showModal(record)}>Chi tiết</Link>)),
        },
    ];

    return (
        <>
            <div className="w-full h-1/5 flex justify-center items-center"><h1 className="h-fit text-5xl font-semibold">Yêu cầu chỉnh sửa</h1></div>
            <EditSetpoint />
            <Table
                columns={columns}
                dataSource={data}
                // onRow={(record) => ({ onClick: () => console.log(record) })}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};
=======
import { useDispatch } from "react-redux";
import EditSetpoint from "./EditSetpoint";
import { setSelectedPlace, showModalOpen } from "../../slices/modalSlice.tsx";
import { EditRequest } from "../../types.ts";
import { useGetAllPlaceChangeRequestQuery } from "../../slices/api/apiSlice.ts";
import { ColumnsType } from "antd/es/table";
import { PlaceChangeApi } from "@admanager/shared";
import { useAppDispatch } from "../../store.ts";

function EditRequestComponent() {
  const { data } = useGetAllPlaceChangeRequestQuery();
  const dispatch = useAppDispatch();
  const columns: ColumnsType<PlaceChangeApi.PlaceChangeRequestResponse> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Địa điểm",
      dataIndex: "ten_dia_diem",
      key: "ten_dia_diem",
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      key: "dia_chi",
    },
    {
      title: "Nội dung",
      dataIndex: "ly_do_chinh_sua",
      key: "ly_do_chinh_sua",
    },
    {
      title: "",
      render: (v) => (
        <a
          onClick={() => {
            dispatch(setSelectedPlace(v));
            dispatch(showModalOpen());
          }}
        >
          Chi tiết
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="flex h-1/5 w-full items-center justify-center">
        <h1 className="h-fit text-5xl font-semibold">Yêu cầu chỉnh sửa</h1>
      </div>
      <EditSetpoint onFormSubmit={(data) => console.log(data)} />
      <Table
        columns={columns}
        dataSource={data || []}
        // onRow={(record) => ({ onClick: () => console.log(record) })}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a

export default EditRequestComponent;
