import { Modal, Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store.ts'
import { onChangeLocation, onChangeAddress } from '../../slices/pointSlice.tsx';
import { showModalClose } from "../../slices/modalSlice.tsx";
=======
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store.ts";
// import { onChangeLocation, onChangeAddress } from '../../slices/pointSlice.tsx';
import { setSelectedPlace, showModalClose } from "../../slices/modalSlice.tsx";
import AdsMapModal from "../AdsMap/AdsMapModal.tsx";
import { useState } from "react";
import { PlaceChangeApi } from "@admanager/shared";
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a

type EditPlaceFormValue =
  | PlaceChangeApi.PlaceChangeRequestCreate
  | PlaceChangeApi.PlaceChangeRequestResponse;

<<<<<<< HEAD
  const dispatch = useDispatch();

  const point = useSelector((state: RootState) => state.point);
  const { location, address, lng, lat } = point;

  const modal = useSelector((state: RootState) => state.modal);
  const { isModalOpen } = modal;

  return (
    <>
      <Modal title="" open={isModalOpen} // onOk={() => dispatch(showModalClose())}
       onCancel={() => dispatch(showModalClose())} footer={null}>
        <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} className="max-w-2xl mt-8">
          <Form.Item label="Tên địa điểm">
            <Input onChange={(e) => dispatch(onChangeLocation(e.target.value))} value={location} />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input onChange={(e) => dispatch(onChangeAddress(e.target.value))} value={address} />
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input className="w-5/6" value={lng && lat ? `${lng} x ${lat}` : ''} /> <Button><Link to="/vhtt/adsmap" ><SearchOutlined ></SearchOutlined></Link></Button>

=======
interface EditSetpointProps {
  onFormSubmit: (data: EditPlaceFormValue) => void;
}

function EditSetpoint(props: EditSetpointProps) {
  const [adMapOpen, setAdMapOpen] = useState<boolean>(false);
  const [selectedLngLat, setSelectedLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.PlaceEditModal);
  const { isModalOpen, selectedPlace } = modal;

  function onFormSubmit(data: EditPlaceFormValue) {
    props.onFormSubmit({ ...data, id_dia_diem: selectedPlace?.id_dia_diem });
  }

  return (
    <>
      <AdsMapModal
        open={adMapOpen}
        onClose={() => setAdMapOpen(false)}
        initPos={{
          lng: selectedPlace?.lng || 106.69377070251456,
          lat: selectedPlace?.lat || 10.788256560601225,
        }}
        onPlaceSelect={(data) => setSelectedLngLat(data)}
      />
      <Modal
        title=""
        open={isModalOpen} // onOk={() => dispatch(showModalClose())}
        onCancel={() => {
          dispatch(showModalClose());
          dispatch(setSelectedPlace(null));
        }}
        footer={null}
      >
        <Form
          onFinish={onFormSubmit}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          className="mt-8 max-w-2xl"
        >
          <Form.Item<EditPlaceFormValue>
            name={"ten_dia_diem"}
            label="Tên địa điểm"
          >
            <Input placeholder={selectedPlace?.ten_dia_diem || ""} />
          </Form.Item>
          <Form.Item<EditPlaceFormValue> name={"dia_chi"} label="Địa chỉ">
            <Input placeholder={selectedPlace?.dia_chi || ""} />
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input
              disabled
              className="w-5/6"
              value={
                selectedLngLat
                  ? `${selectedLngLat.lng} x ${selectedLngLat.lat}`
                  : selectedPlace?.lng && selectedPlace?.lat
                    ? `${selectedPlace.lng} x ${selectedPlace.lat}`
                    : "Không chỉnh sửa"
              }
            />{" "}
            <Button onClick={() => setAdMapOpen(true)}>🗺️</Button>
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Hoàn thành
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditSetpoint;
