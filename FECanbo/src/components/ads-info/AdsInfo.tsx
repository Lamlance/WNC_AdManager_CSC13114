import { Row, Col, Button } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import {
  useLazyGetAllAdsInfo,
  useSubmitAdChangeRequestMutation,
  useSubmitPlaceChangeRequestMutation,
} from "../../slices/api/apiSlice";
import AdsInfoSlider, { AdsInfoDetailProps } from "./AdsInfoDetail";
import { useEffect, useState } from "react";
import { AdsGeoJson, PlaceChangeApi } from "@admanager/shared";
import EditAdForm, { AdChangeFormValue } from "../vhtt/EditAdForm";
import { useAppDispatch } from "../../store";
import {
  setSelectedPlace,
  showModalClose,
  showModalOpen,
} from "../../slices/modalSlice";
import EditSetpoint, { EditPlaceFormValue } from "../vhtt/EditSetpoint";
import { useAppSelector } from "../../hooks";

const AdsInfo = () => {
  const [getAllAds, { data, error, isLoading }] = useLazyGetAllAdsInfo();
  const authState = useAppSelector((state) => state.auth);
  const [selectedRow, setSelectedRow] =
    useState<AdsGeoJson.AdsGeoJsonProperty | null>(null);
  const [submitAdChangeReq] = useSubmitAdChangeRequestMutation();
  const [submitPlaceChangeReq] = useSubmitPlaceChangeRequestMutation();
  const [openAd, setOpenAd] = useState<boolean>(false);
  const [selectedAd, setSelectedAd] = useState<
    (AdsGeoJson.AdsProperty & AdsGeoJson.PlaceProperty) | null
  >(null);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    if (authState.user.accLevel === "department") {
      getAllAds({});
      return;
    }
    getAllAds({
      phuong_id: authState.user.managedWards,
    });
  }, [authState]);

  const dispatch = useAppDispatch();

  function onAdsDataChangeRequest(
    data: AdsGeoJson.AdsProperty & AdsGeoJson.PlaceProperty,
  ) {
    console.log(data);
    setSelectedAd(data);
    setOpenAd(true);
  }

  function onRequestChangePlace(data: AdsGeoJson.AdsGeoJsonProperty) {
    console.log(data);
    dispatch(showModalOpen());
    dispatch(setSelectedPlace({ ...data.place, ly_do_chinh_sua: "" }));
  }

  async function onAdChangeSubmit(data: AdChangeFormValue) {
    if (!selectedAd) return;

    submitAdChangeReq({
      id_quang_cao: selectedAd.id_quang_cao,
      ly_do_chinh_sua: "Ly do gi đó",
      thong_tin_sua: {
        ...data,
        ngay_hieu_luc: data.ngay_hieu_luc?.toDate().toString(),
        ngay_het_han: data.ngay_het_han?.toDate().toString(),
      },
    }).then((v) => console.log(v));
  }

  async function onPlaceChangeSubmit(data: EditPlaceFormValue) {
    console.log(data);
    submitPlaceChangeReq({
      ...data,
      ly_do_chinh_sua: data.ly_do_chinh_sua || "",
    });
    dispatch(showModalClose());
  }

  return (
    <>
      <EditSetpoint showReason={true} onFormSubmit={onPlaceChangeSubmit} />
      {selectedAd && (
        <EditAdForm
          onFormSubmit={onAdChangeSubmit}
          ad={selectedAd}
          type="AdInfo"
          isModalOpen={openAd}
          onClose={() => setOpenAd(false)}
        />
      )}

      {error && <div>There was an error</div>}
      {isLoading && <div>Loading data </div>}
      <Row gutter={20} style={{ minHeight: "100vh" }}>
        <Col span={!!selectedRow ? 17 : 24}>
          <AdsInfoTable
            data={(data || []).map((v) => ({
              ...v,
              loai_vi_tri: v.ads[0].loai_vitri,
            }))}
            onRowSelect={setSelectedRow}
            onRequestChangePlace={onRequestChangePlace}
          />
        </Col>
        <Col span={!!selectedRow ? 7 : 0}>
          {selectedRow && (
            <AdsInfoSlider
              data={selectedRow}
              onRequestChange={onAdsDataChangeRequest}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdsInfo;
