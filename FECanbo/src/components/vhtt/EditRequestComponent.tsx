import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceChangeApi } from "@admanager/shared";
import { showModalOpen, setSelectedPlace } from "../../slices/modalSlice.tsx";
import type { RootState } from "../../store.ts";
import EditSetpoint from "./EditSetpoint.tsx";
import {
  useGetAllPlaceChangeRequestQuery,
  useUpdatePlaceChangeRequestMutation,
} from "../../slices/api/apiSlice.ts";
import type { ColumnsType } from "antd/es/table";

function EditRequestComponent() {
  const { data } = useGetAllPlaceChangeRequestQuery();
  const dispatch = useDispatch();
  // const modal = useSelector((state: RootState) => state.PlaceEditModal);
  // const { isModalOpen, selectedPlace } = modal;

  const [updatePlaceChange] = useUpdatePlaceChangeRequestMutation();

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
      title: "Trạng thái",
      dataIndex: "trang_thai",
    },
    {
      title: "Nội dung",
      dataIndex: "ly_do_chinh_sua",
      key: "ly_do_chinh_sua",
    },
    {
      title: "Xem chi tiết",
      align: "center",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <Link to="#" onClick={() => showModal(record)}>
          Xem chi tiết
        </Link>
      ),
    },
    {
      title: "Xét duyệt",
      align: "center",
      render: (_, rec) => (
        <Button type="primary" onClick={() => handleApproveClick(rec, true)}>
          Xét duyệt
        </Button>
      ),
    },
    {
      title: "Từ chối",
      align: "center",
      render: (_, rec) => (
        <Button
          danger
          type="primary"
          onClick={() => handleApproveClick(rec, false)}
        >
          Từ chối
        </Button>
      ),
    },
  ];

  function handleApproveClick(
    request: PlaceChangeApi.PlaceChangeRequestResponse,
    accept: boolean,
  ) {
    updatePlaceChange({
      ...request,
      trang_thai: accept ? "Đã duyệt" : "Từ chối",
    });
  }

  return (
    <>
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
