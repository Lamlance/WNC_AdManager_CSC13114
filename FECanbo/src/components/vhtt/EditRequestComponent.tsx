import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceChangeApi } from "@admanager/shared";
import { showModalOpen, setSelectedPlace } from "../../slices/modalSlice.tsx";
import type { RootState } from "../../store.ts";
import EditSetpoint from "./EditSetpoint.tsx";
import { useGetAllPlaceChangeRequestQuery } from "../../slices/api/apiSlice.ts";
import type { ColumnsType } from "antd/es/table";

type EditRequest =
  | PlaceChangeApi.PlaceChangeRequestCreate
  | PlaceChangeApi.PlaceChangeRequestResponse;

function EditRequestComponent() {
  const { data } = useGetAllPlaceChangeRequestQuery();
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.PlaceEditModal);
  // const { isModalOpen, selectedPlace } = modal;

  const showModal = (record: PlaceChangeApi.PlaceChangeRequestResponse) => {
    dispatch(showModalOpen());
    dispatch(setSelectedPlace(record));
  };

  const columns: ColumnsType<PlaceChangeApi.PlaceChangeRequestResponse> = [
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
      render: (_, record) => (
        <Link to="#" onClick={() => showModal(record)}>
          Chi tiết
        </Link>
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
export default EditRequestComponent;
