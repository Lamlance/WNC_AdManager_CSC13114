import { Button, Table, notification } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceApi, SocketIoApi, PlaceChangeApi } from "@admanager/shared";
import { showModalOpen, setSelectedPlace } from "../../slices/modalSlice.tsx";
import EditSetpoint from "./EditSetpoint.tsx";
import {
  useLazyGetAllPlaceChangeRequestQuery,
  useUpdatePlaceChangeRequestMutation,
} from "../../slices/api/apiSlice.ts";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks.ts";
import { useGetAllPlaceChangeRequestQuery } from "../../slices/api/apiSlice.ts";

type EditRequest =
  | PlaceChangeApi.PlaceChangeRequestCreate
  | PlaceChangeApi.PlaceChangeRequestResponse;

function EditRequestComponent() {
  const [getAllPlaceChange, { data }] = useLazyGetAllPlaceChangeRequestQuery();
  const authState = useAppSelector((state) => state.auth);
  const [updatePlaceChange] = useUpdatePlaceChangeRequestMutation();
  const [tableCol, setTableCol] = useState<
    ColumnsType<PlaceChangeApi.PlaceChangeRequestResponse>
  >([]);

  const [notifiApi, notifiCtx] = notification.useNotification();
  const dispatch = useDispatch();
  // const modal = useSelector((state: RootState) => state.PlaceEditModal);

  const showModal = (record: PlaceChangeApi.PlaceChangeRequestResponse) => {
    dispatch(showModalOpen());
    dispatch(setSelectedPlace(record));
  };

  function handleUpdatePlaceChangeEvent(
    e: SocketIoApi.CustomEventMap["AdsManager:UpdatePlaceChangeEvent"],
  ) {
    if (authState.isLoggedIn == false) return;
    console.log("AdsManager:UpdatePlaceChangeEvent");
    if (authState.user.accLevel === "department") {
      getAllPlaceChange({});
    } else {
      getAllPlaceChange({ phuong_id: authState.user.managedWards });
    }
    notifiApi.info({
      message: `Yêu cầu chỉnh sửa địa điểm được: ${e.detail?.trang_thai}`,
      description: `Tại ${e.detail?.dia_chi}`,
      placement: "topRight",
      duration: 0,
    });
  }

  useEffect(() => {
    if (
      authState.isLoggedIn == false ||
      authState.user.accLevel === "department"
    ) {
      getAllPlaceChange({});
      setTableCol([
        {
          title: "#",
          dataIndex: "id_yeu_cau",
          key: "id_yeu_cau",
        },
        {
          title: "Địa điểm",
          dataIndex: "ten_dia_diem",
          key: "ten_dia_diem",
          width: "15%",
        },
        {
          title: "Địa chỉ",
          dataIndex: "dia_chi",
          key: "dia_chi",
          width: "25%",
        },
        {
          title: "Tọa độ",
          dataIndex: "lngxlat",
          key: "lngxlat",
          width: "25%",
          render: (text: string, record: EditRequest) => (
            <span>
              {record.lng} x {record.lat}
            </span>
          ),
        },
        {
          title: "Nội dung",
          dataIndex: "ly_do_chinh_sua",
          key: "ly_do_chinh_sua",
          width: "18%",
        },
        {
          title: "",
          dataIndex: "detail",
          key: "detail",
          render: (text: string, record) => (
            <Link to="#" onClick={() => showModal(record)}>
              Chi tiết
            </Link>
          ),
        },
        {
          title: "Xét duyệt",
          align: "center",
          render: (_, rec) => (
            <Button
              type="primary"
              onClick={() => handleApproveClick(rec, "Đã duyệt")}
            >
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
              onClick={() => handleApproveClick(rec, "Từ chối")}
            >
              Từ chối
            </Button>
          ),
        },
      ]);
      return;
    }
    getAllPlaceChange({ phuong_id: authState.user.managedWards });
    setTableCol([
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
        title: "Hủy yêu cầu",
        align: "center",
        render: (_, rec) => (
          <Button
            danger
            type="primary"
            disabled={
              rec.trang_thai === "Đã duyệt" || rec.trang_thai === "Từ chối"
            }
            onClick={() => handleApproveClick(rec, "Đã hủy")}
          >
            Hủy yêu cầu
          </Button>
        ),
      },
    ]);
  }, [authState]);

  useEffect(() => {
    document.addEventListener(
      "AdsManager:UpdatePlaceChangeEvent",
      handleUpdatePlaceChangeEvent,
    );
    return () => {
      document.removeEventListener(
        "AdsManager:UpdatePlaceChangeEvent",
        handleUpdatePlaceChangeEvent,
        true,
      );
    };
  }, []);

  function handleApproveClick(
    request: PlaceChangeApi.PlaceChangeRequestResponse,
    status: "Đã duyệt" | "Từ chối" | "Đã hủy",
  ) {
    updatePlaceChange({
      ...request,
      trang_thai: status,
    });
  }

  return (
    <>
      {notifiCtx}
      <EditSetpoint onFormSubmit={(data) => console.log(data)} />
      <Table
        columns={tableCol}
        dataSource={data || []}
        // onRow={(record) => ({ onClick: () => console.log(record) })}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
export default EditRequestComponent;
