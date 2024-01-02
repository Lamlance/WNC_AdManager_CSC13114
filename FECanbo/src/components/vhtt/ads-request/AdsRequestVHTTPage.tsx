import { useState } from "react";

import AdsRequest from "./AdsRequest";

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
