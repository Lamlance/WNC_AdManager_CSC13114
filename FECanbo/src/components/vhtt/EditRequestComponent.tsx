import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceChangeApi } from "@admanager/shared";
import { showModalOpen, setSelectedPlace } from "../../slices/modalSlice.tsx";
import type { RootState } from "../../store.ts";
import EditSetpoint from "./EditSetpoint.tsx";

type EditRequest =
    | PlaceChangeApi.PlaceChangeRequestCreate
    | PlaceChangeApi.PlaceChangeRequestResponse;


const data: EditRequest[] = [
    { "id_yeu_cau": 1, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id_yeu_cau": 2, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id_yeu_cau": 3, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id_yeu_cau": 4, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
];

function EditRequestComponent() {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.PlaceEditModal);
    // const { isModalOpen, selectedPlace } = modal;

    const showModal = (record: EditRequest) => {
        // dispatch(onChangeLocation(record.location));
        // dispatch(onChangeAddress(record.address));
        // dispatch(setLng(record.lng));
        // dispatch(setLat(record.lat));
        dispatch(showModalOpen());
        dispatch(setSelectedPlace(record));
    };

    const columns = [
        {
            title: "#",
            dataIndex: "id_yeu_cau",
            key: "id_yeu_cau",
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
            dataIndex: "detail",
            key: "detail",
            render: ((text: string, record: EditRequest) => (<Link to='#' onClick={() => showModal(record)}>Chi tiết</Link>)),
        },
    ];

    return (
        <>
            <div className="w-full h-1/5 flex justify-center items-center"><h1 className="h-fit text-5xl font-semibold">Yêu cầu chỉnh sửa</h1></div>
            <EditSetpoint onFormSubmit={function (data: { id_yeu_cau: number; ly_do_chinh_sua: string; id_dia_diem?: number | null | undefined; lng?: number | null | undefined; lat?: number | null | undefined; ten_dia_diem?: string | null | undefined; dia_chi?: string | null | undefined; } | { ly_do_chinh_sua: string; lng?: number | null | undefined; lat?: number | null | undefined; id_dia_diem?: number | null | undefined; ten_dia_diem?: string | null | undefined; dia_chi?: string | null | undefined; }): void {
                throw new Error("Function not implemented.");
            }} />
            <Table
                columns={columns}
                dataSource={data}
                // onRow={(record) => ({ onClick: () => console.log(record) })}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};
export default EditRequestComponent;
