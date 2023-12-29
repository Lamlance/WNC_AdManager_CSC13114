import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store.ts";
// import { onChangeLocation, onChangeAddress } from '../../slices/pointSlice.tsx';
import { setSelectedPlace, showModalClose } from "../../slices/modalSlice.tsx";
import AdsMapModal from "../AdsMap/AdsMapModal.tsx";
import { useState } from "react";
import { PlaceChangeApi } from "@admanager/shared";


type EditPlaceFormValue =
  | PlaceChangeApi.PlaceChangeRequestCreate
  | PlaceChangeApi.PlaceChangeRequestResponse;

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
