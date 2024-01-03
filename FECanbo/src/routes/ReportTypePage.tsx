import { Table, Input, Form, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem/index";
import { useForm } from "antd/es/form/Form";
import { ReportApi } from "@admanager/shared";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store.ts";

import {
  useGetAllReportsTypeQuery,
  useSubmitCreateReportTypeMutation,
  useSubmitUpdateReportTypeMutation,
  useDeleteReportTypeMutation,
} from "../slices/api/apiSlice";
import { loadData, setReportTypeName, setSelectedReportType } from "../slices/reportTypeSlice.ts";

type ReportType = ReportApi.ReportTypeProperty;

function ReportTypeComponent() {
  const [showModalAdd, setshowModalAdd] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);

  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.ReportTypeSlice);
  const { reportTypeId, reportTypeName, reportTypeList } = type;

  const [formAdd] = useForm<ReportType>();
  const [formEdit] = useForm<ReportType>();

  let { data, error, isLoading, refetch } = useGetAllReportsTypeQuery();
  dispatch(loadData(data));
  useEffect(() => {
    refetch();
  }, [showModalAdd, showModalEdit, reportTypeName, reportTypeList]);

  const handleAddClick = () => {
    setshowModalAdd(true);
  };

  const [useSubmitCreateReportType] = useSubmitCreateReportTypeMutation();
  const handleCreate = (value: ReportType) => {
    const createData: ReportType = {
      id_loai_bc: -1,
      loai_bao_cao: value.loai_bao_cao,
    }
    const createReportType = ReportApi.ReportTypeSchema.safeParse(createData)
    if (createReportType.success == true) {
      useSubmitCreateReportType(createReportType.data);
      refetch();
    }
    setshowModalAdd(false);
  }

  const handleEditClick = (row: ReportType) => {
    dispatch(setSelectedReportType(row));
    setshowModalEdit(true);
  };

  const [submitUpdateReportType] = useSubmitUpdateReportTypeMutation()
  const handleSaveChanges = (value: ReportType) => {
    const updateData: ReportType = {
      id_loai_bc: reportTypeId,
      loai_bao_cao: value.loai_bao_cao,
    }
    const updateReportType = ReportApi.ReportTypeSchema.safeParse(updateData)
    if (updateReportType.success == true) {
      submitUpdateReportType(updateReportType.data);
      refetch();
    }
    setshowModalEdit(false);
  };

  const [submitDeletaReportType] = useDeleteReportTypeMutation();
  const handleDelete = (value: ReportType) => {
    const deleteReportType = ReportApi.ReportTypeSchema.safeParse(value)
    if (deleteReportType.success == true) {
      submitDeletaReportType(deleteReportType.data);
      refetch();
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id_loai_bc",
      key: "id_loai_bc",
    },
    {
      title: "Loại hình thức báo cáo",
      dataIndex: "loai_bao_cao",
      key: "loai_bao_cao",
    },
    // {
    //     title: "Số lượng báo cáo",
    //     dataIndex: "count",
    //     key: "count",
    //     render: (() => (<span>10</span>))
    // },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      render: ((text: string, row: ReportType) => (<div className="text-blue-500 underline cursor-pointer" onClick={() => handleEditClick(row)}>Chi tiết</div>)),
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      render: ((text: string, row: ReportType) => (<Button icon={<DeleteOutlined />} onClick={() => handleDelete(row)}>Xóa</Button>)),
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center h-14"><h1 className="h-fit text-4xl font-bold">DANH SÁCH CÁC LOẠI HÌNH BÁO CÁO</h1></div>
      <div className="my-4">
        <div className="flex justify-end"><Button onClick={handleAddClick} className="text-semibold text-base h-10 w-40 bg-sky-300 text-slate-950 border-2 border-cyan-500">Thêm mới</Button></div>
        <Modal open={showModalAdd} onCancel={() => setshowModalAdd(false)} title="Thêm loại hình thức báo cáo" footer={null}>
          <Form
            form={formAdd} onFinish={handleCreate}
            name="wrap" labelCol={{ flex: "110px" }} labelAlign="left" labelWrap
            wrapperCol={{ flex: 1 }} colon={false} className="mt-8 max-w-2xl"
          >
            <Form.Item
              name={"loai_bao_cao"}
              label="Loại báo cáo"
            >
              <Input placeholder={"Nhập loại báo cáo mới"} />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">Thêm</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={reportTypeList}
        pagination={{ pageSize: 5 }}
      />
      <Modal open={showModalEdit} onCancel={() => setshowModalEdit(false)} footer={null}>
        <Form
          form={formEdit} onFinish={handleSaveChanges}
          name="wrap" labelCol={{ flex: "110px" }} labelAlign="left" labelWrap
          wrapperCol={{ flex: 1 }} colon={false} className="mt-8 max-w-2xl"
        >
          <Form.Item
            name={"loai_bao_cao"}
            label="Loại báo cáo"
          >
            <Input placeholder={reportTypeName || ""} />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">Cập nhật</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ReportTypeComponent;
