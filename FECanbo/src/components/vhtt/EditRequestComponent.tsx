import { Table } from "antd";
import { Link } from "react-router-dom";
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

export default EditRequestComponent;
