import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PlaceApi } from "@admanager/shared";
import AdsMapModal from "../../AdsMap/AdsMapModal";

function EditPlaceComponent() {
  const [adMapOpen, setAdMapOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onFormSubmit = (data: PlaceApi.PlaceProperty) => {
    // props.onFormSubmit({ ...data, id_dia_diem: selectedPlace?.id_dia_diem });
  };

  return (
    <>
      <AdsMapModal
        open={adMapOpen}
        onClose={() => setAdMapOpen(false)}
        initPos={{
          lng: 106.69377070251456,
          lat: 10.788256560601225,
        }}
        onPlaceSelect={(data) => console.log(data)}
      />
      <Modal
        title="Chỉnh sửa địa điểm quảng cáo"
        onCancel={() => {}}
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
          <Form.Item label="Quận">
            {/* <span>{place.districtName}</span> */}
          </Form.Item>
          <Form.Item label="Phường">
            {/* <span>{place.wardName}</span> */}
          </Form.Item>
          <Form.Item<PlaceApi.PlaceProperty>
            name={"ten_dia_diem"}
            label="Tên địa điểm"
          >
            {/* <Input placeholder={place.placeName} /> */}
          </Form.Item>
          <Form.Item<PlaceApi.PlaceProperty> name={"dia_chi"} label="Địa chỉ">
            {/* <Input placeholder={place.placeAddress} /> */}
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input
              disabled
              className="w-5/6"
              // value={`${place.placeLng} x ${place.placeLat}`}
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

export default EditPlaceComponent;
