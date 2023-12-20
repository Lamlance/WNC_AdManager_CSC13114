import React from "react";
import { Table } from "antd";
import { EditRequest } from "../../types";
import { Link } from "react-router-dom";

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
        title: "",
        dataIndex: "detail",
        key: "detail",
        render: ((text: string, record: any) => ( <Link to={`/vhtt/editpoint`}>Chi tiết</Link> )),
    },
];

// interface AdsRequestTableProps {
//   data: AdRequest[];
//   onRowClick: (record: AdRequest) => void;
// }

const data = [
    { "id": 1, "location": "agribank","sender": "phuong cau ong lanh quan 1", "address": "159 nguyen thai hoc",  "reason": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id": 2, "location": "agribank","sender": "phuong cau ong lanh", "address": "159 nguyen thai hoc",  "reason": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id": 3, "location": "agribank","sender": "phuong cau ong quan 1", "address": "159 nguyen thai hoc",  "reason": "cau ket gian duong dai dao", lng: 10, lat: 100 },
    { "id": 4, "location": "agribank","sender": "phuong c lanh quan 1", "address": "159 nguyen thai hoc",  "reason": "cau ket gian duong dai dao", lng: 10, lat: 100 },
];

function EditRequestComponent() {
    return (
        <>
            <div className="w-full h-1/5 flex justify-center items-center"><h1 className="h-fit text-5xl font-semibold">Yêu cầu chỉnh sửa</h1></div>
            <Table
                columns={columns}
                dataSource={data}
                onRow={(record) => ({ onClick: () => console.log(record) })}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};

export default EditRequestComponent;
