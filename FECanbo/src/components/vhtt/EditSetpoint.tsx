import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store.ts";
// import { onChangeLocation, onChangeAddress } from '../../slices/pointSlice.tsx';
import { setSelectedPlace, showModalClose } from "../../slices/modalSlice.tsx";
import AdsMapModal from "../AdsMap/AdsMapModal.tsx";
import { useEffect, useState } from "react";
import { PlaceChangeApi } from "@admanager/shared";
import { useForm } from "antd/es/form/Form";
import { useAppSelector } from "../../hooks.ts";

export type EditPlaceFormValue = (
  | PlaceChangeApi.PlaceChangeRequestCreate
  | PlaceChangeApi.PlaceChangeRequestResponse
) & {
  ly_do_chinh_sua?: string;
};

interface EditSetpointProps {
  showReason?: boolean;
  onFormSubmit: (data: EditPlaceFormValue) => void;
}

function EditSetpoint(props: EditSetpointProps) {
  const [adMapOpen, setAdMapOpen] = useState<boolean>(false);
  const [selectedLngLat, setSelectedLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const dispatch = useDispatch();
  const [formHook] = useForm<EditPlaceFormValue>();
  const { isModalOpen, selectedPlace } = useAppSelector(
    (state) => state.PlaceEditModal,
  );

  function onFormSubmit(data: EditPlaceFormValue) {
    props.onFormSubmit({
      ...data,
      lng: selectedLngLat?.lng,
      lat: selectedLngLat?.lat,
      id_dia_diem: selectedPlace?.id_dia_diem,
    });
  }

  useEffect(() => {
    formHook.setFieldsValue(selectedPlace ? { ...selectedPlace } : {});
    if (selectedPlace) {
      console.log(selectedPlace.lng, selectedPlace.lat);
      setSelectedLngLat({
        lng: selectedPlace.lng || 0,
        lat: selectedPlace.lat || 0,
      });
    }
  }, [selectedPlace]);

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
          form={formHook}
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
              className="w-5/6"
              value={
                selectedLngLat
                  ? `${selectedLngLat.lng} x ${selectedLngLat.lat}`
                  : selectedPlace?.lng && selectedPlace?.lat
                    ? `${selectedPlace.lng} x ${selectedPlace.lat}`
                    : "Không chỉnh sửa"
              }
            />
            <Button onClick={() => setAdMapOpen(true)}>🗺️</Button>
          </Form.Item>
          {props.showReason ? (
            <Form.Item<EditPlaceFormValue>
              name="ly_do_chinh_sua"
              label={"Lý do chỉnh sửa"}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          ) : null}

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
