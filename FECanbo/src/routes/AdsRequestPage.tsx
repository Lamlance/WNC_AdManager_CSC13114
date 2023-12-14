import { useEffect, useState } from "react";
import { AdRequest } from "../types";
import AdsRequest from "../components/ads-request/AdsRequest";

const data: AdRequest[] = [
  {
    requestId: "1",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đang xử lý",
    image: "",
    tags: ["nice", "developer"],
  },
  {
    requestId: "2",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã phê duyệt",
    image: "",
    tags: ["nice", "developer"],
  },
  {
    requestId: "3",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã hủy",
    image: "",
    tags: ["nice", "developer"],
  },
];

function AdsRequestPage() {
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
    <AdsRequest data={data} onRowClick={showDetails} selectedAd={selectedAds} />
  );
}
export default AdsRequestPage;