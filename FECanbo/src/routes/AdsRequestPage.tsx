import { useEffect, useState } from "react";
import { AdRequest } from "../types";
import AdsRequest from "../components/ads-request/AdsRequest";
import { Button } from "antd";
import AdsRequestForm from "../components/ads-request/AdsRequestForm";

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
    status: "Đang xử lý",
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
    status: "Đã hủy",
    image: "",
  },
];

function AdsRequestPage() {
  const [selectedAds, setSelectedAds] = useState<AdRequest | null>(null);

  const showDetails = (record: AdRequest) => {
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
    if (data.length > 0) {
      setSelectedAds(data[0]);
    }
  }, []);

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
        data={data}
        onRowClick={showDetails}
        selectedAd={selectedAds}
      />

      <AdsRequestForm isVisible={isFormVisible} onCancel={closeForm} />
    </>
  );
}
export default AdsRequestPage;
