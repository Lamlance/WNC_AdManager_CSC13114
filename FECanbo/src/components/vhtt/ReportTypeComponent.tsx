import { Table, Input, Form, Modal, Button } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem/index";
import { ReportApi, ReportTypeApi } from "@admanager/shared";
import { useGetAllReportTypeQuery } from "../../slices/api/apiSlice";
import { ColumnsType } from "antd/es/table";
// import { ReportType } from "../../types.tsx";

type ReportType = ReportApi.ReportType;

// const data: ReportType[] = [
//   { id_loai_bao_cao: 1, ten_loai_bao_cao: "Tố giác sai phạm" },
//   { id_loai_bao_cao: 2, ten_loai_bao_cao: "Đăng ký nội dung" },
//   { id_loai_bao_cao: 3, ten_loai_bao_cao: "Đóng góp ý kiến" },
//   { id_loai_bao_cao: 4, ten_loai_bao_cao: "Giải đáp thắc mắc" },
// ];

function ReportTypeComponent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReportType | null>(null);

  const { data } = useGetAllReportTypeQuery();

  const handleEditClick = (row: ReportType) => {
    setSelectedRow(row);
    console.log("Dữ liệu cần cập nhật:", row);
    setShowModal(true);
  };

  const handleSaveChanges = (updatedData: ReportType) => {
    // update data in table, ex: send data to back end
    console.log("Dữ liệu cần cập nhật:", updatedData);
    setShowModal(false);
  };

  const columns: ColumnsType<ReportTypeApi.GetAllReportTypeResponse> = [
    {
      title: "#",
      dataIndex: ["loai_bc", "id_loai_bc"],
      key: "id_loai_bc",
    },
    {
      title: "Loại hình thức báo cáo",
      dataIndex: ["loai_bc", "loai_bao_cao"],
      key: "loai_bao_cao",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      render: (text: string, row) => (
        <div className="cursor-pointer text-blue-500 underline">Chi tiết</div>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "delete",
      key: "delete",
      render: (text: string, row) => (
        <Button icon={<DeleteOutlined />}>Xóa</Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex h-1/5 w-full items-center justify-center">
        <h1 className="h-fit text-5xl font-semibold">
          Danh sách các loại hình báo cáo
        </h1>
      </div>
      <div className="flex justify-center">
        <Form className="flex w-1/2 justify-between">
          <FormItem className="w-9/12">
            <Input
              className="border-sky-500"
              placeholder="Thêm mới loại hình báo cáo"
            ></Input>
          </FormItem>
          <FormItem className="flex-auto">
            <Button className=" bg-sky-500 text-slate-100">Thêm</Button>
          </FormItem>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data || []}
        pagination={{ pageSize: 5 }}
      />
      <Modal open={showModal} onCancel={() => setShowModal(false)}>
        <Form
          // onFinish={onFormSubmit}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          className="mt-8 max-w-2xl"
        >
          <Form.Item name={"loai_bao_cao"} label="Loại báo cáo">
            <Input placeholder={selectedRow?.ten_loai_bao_cao || ""} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default ReportTypeComponent;
