import { useState } from "react";
import { AdRequest } from "../../../types";
import AdsRequest from "./AdsRequest";
import { useGetAllAdsRequestQuery } from "../../../slices/api/apiSlice";

function convertAdRequestData(data: any[]): AdRequest[] {
  return data.map((item) => {
    const {
      place: { ten_dia_diem, dia_chi },
      idYeucau,
      adsContent,
      companyName,
      companyPhone,
      effDate,
      expDate,
    } = item;

    const requestId = idYeucau.toString();
    const panoContent = adsContent;
    const position = ten_dia_diem;
    const email = "";
    const phoneNumber = companyPhone;
    const address = dia_chi;
    const effectedDate = effDate;
    const expiredDate = expDate;
    const status = "Chưa xử lý";
    const image = "";

    return {
      requestId,
      panoContent,
      position,
      companyName,
      email,
      phoneNumber,
      address,
      effectedDate,
      expiredDate,
      status,
      image,
    };
  });
}

function AdsRequestVHTTPage() {
  const [selectedAds, setSelectedAds] = useState<AdRequest | null>(null);
  const { data, error, isLoading } = useGetAllAdsRequestQuery();

  const showDetails = (record: AdRequest) => {
    setSelectedAds(record);
  };

  const convertedData = data ? convertAdRequestData(data) : [];

  return (
    <>
      <AdsRequest
        data={convertedData}
        onRowClick={showDetails}
        selectedAd={selectedAds}
      />
    </>
  );
}
export default AdsRequestVHTTPage;
