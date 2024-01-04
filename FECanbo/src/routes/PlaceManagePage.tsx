import { Table, Input, Form, Modal, Button, Dropdown, Space, Menu, MenuProps, message } from "antd";
import { useEffect, useState } from "react";
import { ConsoleSqlOutlined, DeleteOutlined, DownOutlined, WalletFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { PlaceApi } from "@admanager/shared";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store.ts";
import {
    useGetAllDistrictQuery,
    useGetAllWard2Query,
    useGetAllPlaceQuery,
    useSubmitCreatePlaceMutation,
    useSubmitUpdatePlaceMutation,
    useDeletePlaceMutation,
} from "../slices/api/apiSlice.ts";
import * as PlaceReducer from "../slices/placeSlice.tsx";
import { showAddPlaceModalOpen, showEditPlaceModalOpen } from "../slices/modalSlice.tsx";
import AddPlaceComponent from "../components/vhtt/AddPlaceComponent.tsx";
import EditPlaceComponent from "../components/vhtt/EditPlaceComponent.tsx";

type Place = PlaceApi.PlaceProperty;

function PlaceManagePage() {
    // const [showModalEdit, setshowModalEdit] = useState(false);

    const dispatch = useDispatch();
    const place = useSelector((state: RootState) => state.PlaceSlice);
    const modal = useSelector((state: RootState) => state.ModalSlice);

    const [formEdit] = useForm<Place>();

    //distrcit dropdown
    const handleSelectDistrict: MenuProps['onClick'] = (e) => {
        dispatch(PlaceReducer.setDistrict(e.key))
        dispatch(PlaceReducer.setDistrictName(place.districtList.find(obj => obj.id === Number(e.key))?.ten_quan))
        dispatch(PlaceReducer.setWardName("Chọn phường"))
    };
    const { data: districtData } = useGetAllDistrictQuery();
    dispatch(PlaceReducer.loadDistrict(districtData))
    const districtDropdownData: MenuProps['items'] = districtData?.map((district) => ({
        key: district.id.toString(),
        value: district.id,
        label: district.ten_quan,
    }));
    const districtMenuProps = { items: districtDropdownData, onClick: handleSelectDistrict, };

    //ward dropdown
    const handleSelectWard: MenuProps['onClick'] = (e) => {
        console.log(place.wardList)
        dispatch(PlaceReducer.setWard(e.key))
        dispatch(PlaceReducer.setWardName(place.wardList.find(obj => obj.id_phuong === Number(e.key))?.ten_phuong))
    };
    const { data: wardData, refetch: wardRefetch } = useGetAllWard2Query(place.districtId);
    dispatch(PlaceReducer.loadWard(wardData))
    const wardDropdownData: MenuProps['items'] = wardData?.map((ward) => ({
        key: ward.id_phuong.toString(),
        value: ward.id_phuong,
        label: ward.ten_phuong,
    }));
    const wardMenuProps = { items: wardDropdownData, onClick: handleSelectWard, };

    //place -> table
    let { data: placeData, error: placeError, isLoading: placeIsLoading, refetch: placeRefetch } = useGetAllPlaceQuery(place.wardId);
    dispatch(PlaceReducer.loadPlace(placeData));

    useEffect(() => {
        placeRefetch();
    }, [place, modal])

    const handleAddClick = () => {
        dispatch(showAddPlaceModalOpen());
    };

    const handleEditClick = (row: Place) => {
        dispatch(PlaceReducer.setSelectedPlace(row));
        dispatch(showEditPlaceModalOpen());
    };

    const [submitDeletaPlace] = useDeletePlaceMutation();
    const handleDelete = (value: Place) => {
        const deletePlace = PlaceApi.PlaceSchema.safeParse(value)
        if (deletePlace.success == true) {
            submitDeletaPlace(deletePlace.data);
            placeRefetch();
        }
    };

    const columns = [
        {
            title: "#",
            dataIndex: "id_dia_diem",
            key: "id_dia_diem",
            width: '1%',
        },
        {
            title: "Địa điểm",
            dataIndex: "ten_dia_diem",
            key: "ten_dia_diem",
            width: '15%',
        },
        {
            title: "Địa chỉ",
            dataIndex: "dia_chi",
            key: "dia_chi",
            width: '30%',
        },
        {
            title: "Số biển quảng cáo",
            dataIndex: "count",
            key: "count",
            width: '13%',
            render: (() => (<span>10</span>))
        },
        {
            title: "Vị trí",
            dataIndex: "coordinates",
            key: "coordinates",
            width: '20%',
            render: ((text: string, row: Place) => (<div>{`${row.lng}, ${row.lat}`}</div>)),
        },
        {
            title: "Chi tiết",
            dataIndex: "detail",
            key: "detail",
            width: '7%',
            render: ((text: string, row: Place) => (<div className="text-blue-500 cursor-pointer" onClick={() => handleEditClick(row)}>Chi tiết</div>)),
        },
        {
            title: "",
            dataIndex: "delete",
            key: "delete",
            render: ((text: string, row: Place) => (<Button icon={<DeleteOutlined />} onClick={() => handleDelete(row)} style={{ color: "red", }}>Xóa</Button>)),
        },
    ];

    return (
        <>
            <div className="w-full flex justify-center h-14"><h1 className="h-fit text-4xl font-bold">DANH SÁCH CÁC ĐIỂM ĐẶT QUẢNG CÁO</h1></div>
            <div className="my-4 flex gap-x-4">
                <div className="flex-col w-1/6">
                    <div className="font-semibold text-base">Chọn quận</div>
                    <Dropdown menu={districtMenuProps} className="h-10">
                        <Button>
                            <Space className="w-40 flex justify-between">
                                {place.districtName}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <div className="flex-col w-1/6">
                    <div className="font-semibold text-base">Chọn phường</div>
                    <Dropdown menu={wardMenuProps} className="h-10">
                        <Button>
                            <Space className="w-40 flex justify-between">
                                {place.wardName}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <div className="my-4 flex justify-end">
                <Button onClick={handleAddClick} className="text-semibold text-base h-10 w-40 bg-sky-300 text-slate-950 border-2 border-cyan-500">Thêm mới</Button>
                <AddPlaceComponent />
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={place.placeList}
                pagination={{ pageSize: 4 }}
            />
            <EditPlaceComponent />
            {/* <Modal open={showModalEdit} onCancel={() => setshowModalEdit(false)} footer={null}>
                <Form
                    form={formEdit} onFinish={handleSaveChanges}
                    name="wrap" labelCol={{ flex: "110px" }} labelAlign="left" labelWrap
                    wrapperCol={{ flex: 1 }} colon={false} className="mt-8 max-w-2xl"
                >
                    <Form.Item
                        name={"loai_bao_cao"}
                        label="Loại báo cáo"
                    >
                        <Input placeholder={place.placeName || ""} />
                    </Form.Item>
                    <Form.Item className="flex justify-center">
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                </Form>
            </Modal> */}
        </>
    );
};
export default PlaceManagePage;
