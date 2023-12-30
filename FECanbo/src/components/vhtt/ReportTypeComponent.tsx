import { Table, Input, Form, Modal, Button } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem/index";
import { ReportApi } from "@admanager/shared";
// import { ReportType } from "../../types.tsx";

type ReportType = ReportApi.ReportType;

const data: ReportType[] = [
    { "id_loai_bao_cao": 1, "ten_loai_bao_cao": "Tố giác sai phạm" },
    { "id_loai_bao_cao": 2, "ten_loai_bao_cao": "Đăng ký nội dung" },
    { "id_loai_bao_cao": 3, "ten_loai_bao_cao": "Đóng góp ý kiến" },
    { "id_loai_bao_cao": 4, "ten_loai_bao_cao": "Giải đáp thắc mắc" },
];

function ReportTypeComponent() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ReportType | null>(null);

    const handleEditClick = (row: ReportType) => {
        setSelectedRow(row);
        console.log('Dữ liệu cần cập nhật:', row);
        setShowModal(true);
    };

    const handleSaveChanges = (updatedData: ReportType) => {
        // update data in table, ex: send data to back end
        console.log('Dữ liệu cần cập nhật:', updatedData);
        setShowModal(false);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "id_loai_bao_cao",
            key: "id_loai_bao_cao",
        },
        {
            title: "Loại hình thức báo cáo",
            dataIndex: "ten_loai_bao_cao",
            key: "ten_loai_bao_cao",
        },
        {
            title: "Số lượng báo cáo",
            dataIndex: "count",
            key: "count",
            render: (() => (<span>10</span>))
        },
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
            render: ((text: string, row: ReportType) => (<Button icon={<DeleteOutlined />} onClick={() => handleEditClick(row)}>Xóa</Button>)),
        },
    ];

    return (
        <>
            <div className="w-full h-1/5 flex justify-center items-center"><h1 className="h-fit text-5xl font-semibold">Danh sách các loại hình báo cáo</h1></div>
            <div className="flex justify-center">
                <Form className="w-1/2 flex justify-between">
                    <FormItem className="w-9/12"><Input className="border-sky-500" placeholder="Thêm mới loại hình báo cáo"></Input></FormItem>
                    <FormItem className="flex-auto"><Button className=" bg-sky-500 text-slate-100">Thêm</Button></FormItem>
                </Form>
            </div>
            <Table
                columns={columns}
                dataSource={data}
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
                    <Form.Item
                        name={"loai_bao_cao"}
                        label="Loại báo cáo"
                    >
                        <Input placeholder={selectedRow?.ten_loai_bao_cao || ""} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ReportTypeComponent;
