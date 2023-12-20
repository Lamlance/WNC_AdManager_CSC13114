import { useEffect, useState } from "react";
import { AdRequest } from "../../../types";
import AdsRequest from "./AdsRequest";

const data: AdRequest[] = [
  {
    requestId: "1",
    panoContent: "Quảng cáo",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    companyName: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    effectedDate: "12/11/2022 ",
    expiredDate: "22/12/2023",
    status: "Chưa xử lý",
    image: "",
  },
  {
    requestId: "2",
    panoContent: "Quảng cáo",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    companyName: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    effectedDate: "12/11/2022 ",
    expiredDate: "22/12/2023",
    status: "Đã phê duyệt",
    image: "",
  },
  {
    requestId: "3",
    panoContent: "Quảng cáo",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    companyName: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    effectedDate: "12/11/2022 ",
    expiredDate: "22/12/2023",
    status: "Đã từ chối",
    image: "",
  },
];

function AdsRequestVHTTPage() {
  const [selectedAds, setSelectedAds] = useState<AdRequest | null>(null);

  const showDetails = (record: AdRequest) => {
    setSelectedAds(record);
  };

  useEffect(() => {
    if (data.length > 0) {
      setSelectedAds(data[0]);
    }
  }, []);

  return (
    <>
      <AdsRequest
        data={data}
        onRowClick={showDetails}
        selectedAd={selectedAds}
      />
    </>
  );
}
export default AdsRequestVHTTPage;
