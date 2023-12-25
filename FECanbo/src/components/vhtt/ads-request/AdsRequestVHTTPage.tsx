import { useState } from "react";
import { AdRequest } from "../../../types";
import AdsRequest from "./AdsRequest";
import { useGetAllAdsReqQuery } from "../../../slices/api/apiSlice";
import { AdsReqApi } from "@admanager/shared";

function AdsRequestVHTTPage() {
  const [selectedAds, setSelectedAds] =
    useState<AdsReqApi.ManyAdsRequestResponse | null>(null);

  const showDetails = (record: AdsReqApi.ManyAdsRequestResponse) => {
    setSelectedAds(record);
  };

  return (
    <>
      <AdsRequest onRowClick={showDetails} selectedAd={selectedAds} />
    </>
  );
}
export default AdsRequestVHTTPage;
