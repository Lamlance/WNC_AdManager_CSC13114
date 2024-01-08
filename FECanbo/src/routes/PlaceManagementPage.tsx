import { Button, Col, Table } from "antd";
import PlaceInfoTable from "../components/vhtt/place/PlaceInfoTable";
import { useState } from "react";
import EditModalComponent from "../components/vhtt/place/EditPlaceForm";
import { PlaceApi } from "@admanager/shared";
import {
  useCreatePlaceInfoMutation,
  useUpdatePlaceInfoMutation,
} from "../slices/api/apiSlice";

type PlaceFormValue = PlaceApi.CreatePlaceBody & {
  id_dia_diem: number | undefined;
};

function PlaceManagemnetPlace() {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<PlaceApi.PlaceProperty | null>(
    null,
  );
  const [updatePlace] = useUpdatePlaceInfoMutation();
  const [createPlace] = useCreatePlaceInfoMutation();

  function handleCloseModal(setOpen: boolean) {
    setModalOpen(setOpen);
    if (setOpen == false) setSelectedRow(null);
  }

  function hadnleTableRowSelect(value: PlaceApi.PlaceProperty) {
    setSelectedRow(value);
    setModalOpen(true);
  }

  function onFormSubmit(value: PlaceFormValue) {
    console.log(value);
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

  return (
    <div>
      <EditModalComponent
        initData={selectedRow || undefined}
        modalOpen={openModal}
        setModalOpen={handleCloseModal}
        onFormSubmit={onFormSubmit}
      />
      <Button type="primary" onClick={handleAddPlaceClick}>
        Thêm địa điểm
      </Button>
      <PlaceInfoTable onRowSelect={hadnleTableRowSelect} />
    </div>
  );
}

export default PlaceManagemnetPlace;
