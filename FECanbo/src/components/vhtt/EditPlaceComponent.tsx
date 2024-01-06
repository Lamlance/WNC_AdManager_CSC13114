import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store.ts";
import * as PlaceReducer from "../../slices/placeSlice.tsx";
import { showEditPlaceModalClose } from "../../slices/modalSlice.tsx";
import AdsMapModal from "../AdsMap/AdsMapModal.tsx";
import { useState } from "react";
import { PlaceApi } from "@admanager/shared";
import { useSubmitCreatePlaceMutation } from "../../slices/api/apiSlice.ts";


function EditPlaceComponent() {
    const [adMapOpen, setAdMapOpen] = useState<boolean>(false);
    // const [selectedLngLat, setSelectedLngLat] = useState<{
    //     lng: number;
    //     lat: number;
    // } | null>(null);
    const dispatch = useDispatch();
    const place = useSelector((state: RootState) => state.PlaceSlice);
    const modal = useSelector((state: RootState) => state.ModalSlice);

    const { isEditPlaceModalOpen } = modal;

    const [useSubmitCreatePlace] = useSubmitCreatePlaceMutation();
    const onFormSubmit = (data: PlaceApi.PlaceProperty) => {
        // props.onFormSubmit({ ...data, id_dia_diem: selectedPlace?.id_dia_diem });
        const createData: PlaceApi.PlaceProperty = {
            id_dia_diem: -1,
            ten_dia_diem: data.ten_dia_diem,
            dia_chi: data.dia_chi,
            lng: place.placeLng,
            lat: place.placeLat,
            id_phuong: Number(place.wardId),
            id_ban_do: "null",
        }
        const createPlace = PlaceApi.PlaceSchema.safeParse(createData)
        if (createPlace.success == true) {
            console.log('true')
            useSubmitCreatePlace(createPlace.data);
        }
        else{
            console.log(createPlace.error)
        }
        dispatch(showEditPlaceModalClose());
    }

    return (
        <>
            <AdsMapModal
                open={adMapOpen}
                onClose={() => setAdMapOpen(false)}
                initPos={{
                    lng: place.placeLng || 106.69377070251456,
                    lat: place.placeLat || 10.788256560601225,
                }}
                onPlaceSelect={(data) => dispatch(PlaceReducer.setCoordinates(data))}
            />
            <Modal
                title="Chỉnh sửa địa điểm quảng cáo"
                open={isEditPlaceModalOpen} // onOk={() => dispatch(showModalClose())}
                onCancel={() => {
                    dispatch(showEditPlaceModalClose());
                    // dispatch(PlaceReducer.setSelectedPlace(null));
                }}
                footer={null}
            >
                <Form onFinish={onFormSubmit} name="wrap" labelCol={{ flex: "110px" }} labelAlign="left"
                    labelWrap wrapperCol={{ flex: 1 }} colon={false} className="mt-8 max-w-2xl"
                >
                    <Form.Item label="Quận"><span>{place.districtName}</span></Form.Item>
                    <Form.Item label="Phường"><span>{place.wardName}</span></Form.Item>
                    <Form.Item<PlaceApi.PlaceProperty> name={"ten_dia_diem"} label="Tên địa điểm"><Input placeholder={place.placeName}/></Form.Item>
                    <Form.Item<PlaceApi.PlaceProperty> name={"dia_chi"} label="Địa chỉ"><Input placeholder={place.placeAddress}/></Form.Item>
                    <Form.Item label="Vị trí">
                        <Input disabled className="w-5/6"
                            value={ `${place.placeLng} x ${place.placeLat}` } />{" "}
                        <Button onClick={() => setAdMapOpen(true)}>🗺️</Button>
                    </Form.Item>
                    <Form.Item className="flex justify-center">
                        <Button type="primary" htmlType="submit">
                            Cập nhật 
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditPlaceComponent;
