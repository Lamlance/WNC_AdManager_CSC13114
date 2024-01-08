import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PlaceApi } from "@admanager/shared";
import AdsMapModal from "../../AdsMap/AdsMapModal";
import { useForm } from "antd/es/form/Form";

type PlaceFormValue = PlaceApi.CreatePlaceBody & {
  id_dia_diem: number | undefined;
};

type EditPlaceComponentProps = {
  initData?: PlaceApi.GetAllPlaceResponse["place"] | null;
  modalOpen: boolean;
  setModalOpen: (setOpen: boolean) => any;
  onFormSubmit?: (data: PlaceFormValue) => void;
};
type PlaceSelect = {
  formatted_address: string;
  lng: number;
  lat: number;
};
function EditModalComponent(props: EditPlaceComponentProps) {
  const [adMapOpen, setAdMapOpen] = useState<boolean>(false);
  const [placeSelected, setPlaceSelected] = useState<PlaceSelect | null>(null);

  const [formHook] = useForm<PlaceFormValue>();

  const onFormSubmit = (data: PlaceFormValue) => {
    // props.onFormSubmit({ ...data, id_dia_diem: selectedPlace?.id_dia_diem });
    data.id_dia_diem = props.initData?.id_dia_diem;
    if (placeSelected) {
      data.lng = placeSelected.lng;
      data.lat = placeSelected.lat;
    }
    props.onFormSubmit?.(data);
  };

  useEffect(() => {
    if (props.initData) {
      formHook.setFieldsValue(props.initData);
      setPlaceSelected({
        formatted_address: props.initData.dia_chi,
        lng: props.initData.lng,
        lat: props.initData.lat,
      });
    } else {
      formHook.setFieldsValue({});
    }
  }, [props.initData]);

  return (
    <>
      <AdsMapModal
        open={adMapOpen}
        onClose={() => setAdMapOpen(false)}
        initPos={{
          lng: placeSelected?.lng || 106.69377070251456,
          lat: placeSelected?.lat || 10.788256560601225,
        }}
        onPlaceSelect={(data) => {
          formHook.setFieldValue("ten_dia_diem", data.formatted_address);
          formHook.setFieldValue("dia_chi", data.formatted_address);
          setPlaceSelected(data);
        }}
      />
      <Modal
        open={props.modalOpen}
        title="Chỉnh sửa địa điểm quảng cáo"
        onCancel={() => props.setModalOpen(false)}
        footer={null}
      >
        <Form<PlaceFormValue>
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
          {/* <Form.Item label="Quận">
          </Form.Item>
          <Form.Item label="Phường">
          </Form.Item> */}
          <Form.Item<PlaceFormValue> name={"ten_dia_diem"} label="Tên địa điểm">
            <Input
              placeholder={props.initData?.ten_dia_diem || "Tên địa điểm"}
            />
          </Form.Item>
          <Form.Item<PlaceFormValue> name={"dia_chi"} label="Địa chỉ">
            <Input placeholder={props.initData?.dia_chi || "Địa chỉ"} />
          </Form.Item>
          <Form.Item
            label="Vị trí"
            rules={[{ required: true, message: "Chọn địa điểm" }]}
          >
            <Input
              className="w-5/6"
              value={
                placeSelected
                  ? `${placeSelected.lng} x ${placeSelected.lat}`
                  : undefined
              }
            />
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

export default EditModalComponent;
