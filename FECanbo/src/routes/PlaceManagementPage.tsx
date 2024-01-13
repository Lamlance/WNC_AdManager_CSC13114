import { Button, Col, Table, UploadFile } from "antd";
import PlaceInfoTable from "../components/vhtt/place/PlaceInfoTable";
import { useState } from "react";
import EditModalComponent from "../components/vhtt/place/EditPlaceForm";
import { AdChangeApi, PlaceApi } from "@admanager/shared";
import {
  useCreateAdsInfoMutation,
  useCreatePlaceInfoMutation,
  useUpdatePlaceInfoMutation,
} from "../slices/api/apiSlice";
import EditAdForm, { AdChangeFormValue } from "../components/vhtt/EditAdForm";

type PlaceFormValue = PlaceApi.CreatePlaceBody & {
  id_dia_diem: number | undefined;
};

function PlaceManagemnetPlace() {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [openAdsModal, setAdsModalOpen] = useState<boolean>(false);
  const [createAds] = useCreateAdsInfoMutation();
  const [selectedRow, setSelectedRow] = useState<PlaceApi.PlaceProperty | null>(
    null,
  );
  const [updatePlace] = useUpdatePlaceInfoMutation();
  const [createPlace] = useCreatePlaceInfoMutation();

  function handleCloseModal(setOpen: boolean) {
    setModalOpen(setOpen);
    setAdsModalOpen(false);
    setSelectedRow(null);
  }

  function hadnleTableRowSelect(
    value: PlaceApi.PlaceProperty,
    openModal: boolean,
  ) {
    setSelectedRow(value);
    setModalOpen(openModal);
  }

  function onFormSubmit(value: PlaceFormValue) {
    //console.log(value);
    if (value.id_dia_diem) {
      updatePlace({ ...value, id_dia_diem: value.id_dia_diem }).then((v) =>
        console.log(v),
      );
    } else {
      createPlace(value).then((v) => console.log(v));
    }
    handleCloseModal(false);
  }

  function handleAddPlaceClick() {
    setSelectedRow(null);
    setModalOpen(true);
  }

  function handleAdFormSubmit(value: AdChangeFormValue) {
    if (!selectedRow) return;
    const fullAdData = AdChangeApi.AdCreateBodySchema.safeParse({
      ...value,
      ngay_het_han: value.ngay_het_han?.toDate(),
      ngay_hieu_luc: value.ngay_hieu_luc?.toDate(),
      id_dia_diem: selectedRow.id_dia_diem,
    });
    if (fullAdData.success == false) return console.log(fullAdData.error);
    console.log(fullAdData.data);

    const formData = new FormData();
    Object.entries(fullAdData.data).forEach((d) => {
      if (d[1]) formData.append(d[0], d[1].toString());
    });
    value.hinh_anh.forEach((h) => {
      if (h.originFileObj) formData.append("hinh_anh", h.originFileObj);
    });

    createAds(formData);
  }

  return (
    <div>
      <EditAdForm
        type="AdInfo"
        onFormSubmit={handleAdFormSubmit}
        isModalOpen={openAdsModal}
        onClose={() => handleCloseModal(false)}
        ad={null}
      />
      <EditModalComponent
        initData={selectedRow || undefined}
        modalOpen={openModal}
        setModalOpen={handleCloseModal}
        onFormSubmit={onFormSubmit}
      />
      <div className=" mb-2 flex flex-row gap-x-2">
        <Button type="primary" onClick={handleAddPlaceClick}>
          Thêm địa điểm
        </Button>
        <Button
          type="primary"
          disabled={!selectedRow}
          onClick={() => setAdsModalOpen(true)}
        >
          Thêm quảng cáo
        </Button>
      </div>

      <PlaceInfoTable onRowSelect={hadnleTableRowSelect} />
    </div>
  );
}

export default PlaceManagemnetPlace;
