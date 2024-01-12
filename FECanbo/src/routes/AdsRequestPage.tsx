import { useEffect, useState } from "react";
import { AdRequest } from "../types/view-model";
import AdsRequest from "../components/ads-request/AdsRequest";
import { Button } from "antd";
import AdsRequestForm from "../components/ads-request/AdsRequestForm";
import {
  useGetAllAdsReqQuery,
  useLazyGetAllAdsReq,
} from "../slices/api/apiSlice";
import { AdsReqApi } from "@admanager/shared";
import { useAppSelector } from "../hooks";

function AdsRequestPage() {
  const [selectedAds, setSelectedAds] =
    useState<AdsReqApi.ManyAdsRequestResponse | null>(null);
  const [getAllAdsReq, { data }] = useLazyGetAllAdsReq();
  const authState = useAppSelector((state) => state.auth);
  const showDetails = (record: AdsReqApi.ManyAdsRequestResponse) => {
    setSelectedAds(record);
  };
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    console.log("Button clicked - showForm");
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
  useEffect(() => {
    if (!authState.isLoggedIn) return;
    if (authState.user.accLevel === "department") {
      getAllAdsReq({});
    } else {
      getAllAdsReq({
        phuong_id: authState.user.managedWards,
      });
    }
  }, [authState]);

  return (
    <>
      <Button
        onClick={showForm}
        style={{
          marginBottom: 16,
          backgroundColor: "#1890ff",
          color: "#fff",
        }}
      >
        Thêm yêu cầu
      </Button>
      <AdsRequest
        data={data ? data : []}
        onRowClick={showDetails}
        selectedAd={selectedAds}
      />

      <AdsRequestForm isVisible={isFormVisible} onCancel={closeForm} />
    </>
  );
}
export default AdsRequestPage;
