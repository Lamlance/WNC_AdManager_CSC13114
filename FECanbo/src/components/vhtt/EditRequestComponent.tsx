import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceApi, PlaceChangeApi } from "@admanager/shared";
import { showModalOpen, setSelectedPlace } from "../../slices/modalSlice.tsx";
import type { RootState } from "../../store.ts";
import EditSetpoint from "./EditSetpoint.tsx";
import { useGetAllPlaceChangeRequestQuery } from "../../slices/api/apiSlice.ts";


type EditRequest =
    | PlaceChangeApi.PlaceChangeRequestCreate
    | PlaceChangeApi.PlaceChangeRequestResponse;


// const data: EditRequest[] = [
//     { "id_yeu_cau": 1, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
//     { "id_yeu_cau": 2, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
//     { "id_yeu_cau": 3, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
//     { "id_yeu_cau": 4, "ten_dia_diem": "agribank", "dia_chi": "159 nguyen thai hoc", "ly_do_chinh_sua": "cau ket gian duong dai dao", lng: 10, lat: 100 },
// ];

function EditRequestComponent() {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.PlaceEditModal);

    const { data } = useGetAllPlaceChangeRequestQuery();

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
            title: "Địa điểm",
            dataIndex: "ten_dia_diem",
            key: "ten_dia_diem",
            width: '15%',
            render: (text: string, record: EditRequest) => (
                <span>{record.thong_tin_hien_tai?.ten_dia_diem}</span>
              ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "dia_chi",
            key: "dia_chi",
            width: '25%',
            render: (text: string, record: EditRequest) => (
                <span>{record.thong_tin_hien_tai?.dia_chi}</span>
              ),
        },
        {
            title: "Nội dung",
            dataIndex: "ly_do_chinh_sua",
            key: "ly_do_chinh_sua",
            width: '18%',
        },
        {
            title: "Thời điểm chỉnh sửa",
            dataIndex: "thoi_diem_chinh_sua",
            key: "thoi_diem_chinh_sua",
            width: '18%',
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            key: "trang_thai",
            width: '12%',
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
            <div className="w-full flex justify-center h-14"><h1 className="h-fit text-4xl font-bold">YÊU CẦU CHỈNH SỬA ĐIỂM ĐẶT</h1></div>
            {/* <EditSetpoint onFormSubmit={function (data: { id_yeu_cau: number; ly_do_chinh_sua: string; id_dia_diem?: number | null | undefined; lng?: number | null | undefined; lat?: number | null | undefined; ten_dia_diem?: string | null | undefined; dia_chi?: string | null | undefined; } | { ly_do_chinh_sua: string; lng?: number | null | undefined; lat?: number | null | undefined; id_dia_diem?: number | null | undefined; ten_dia_diem?: string | null | undefined; dia_chi?: string | null | undefined; }): void {
                throw new Error("Function not implemented.");
            }} /> */}
            <Table
                bordered
                columns={columns}
                dataSource={data}
                // onRow={(record) => ({ onClick: () => console.log(record) })}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};
export default EditRequestComponent;
