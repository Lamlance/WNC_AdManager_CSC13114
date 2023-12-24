import { useEffect, useState } from "react";
import { AdRequest } from "../types/view-model";
import AdsRequest from "../components/ads-request/AdsRequest";
import { Button } from "antd";
import AdsRequestForm from "../components/ads-request/AdsRequestForm";
import { useGetAllAdsReqQuery } from "../slices/api/apiSlice";
import { AdsReqApi } from "@admanager/shared";

// const data: AdRequest[] = [
//   {
//     id_diem_dat: "1",
//     noi_dung_qc: "Quảng cáo",
//     id_diem_dat: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
//     ten_cty: "TNVH HN",
//     email_cty: "pthn@gmail.com",
//     dien_thoai_cty: "19001001",
//     dia_chi_cty: "227 NCV, Q5, HCM",
//     ngay_hieu_luc: "12/11/2022 ",
//     ngay_het_han: "22/12/2023",
//     trang_thai: "Đang xử lý",
//     hinh_anh: "",
//   },
//   {
//     id_diem_dat: "2",
//     noi_dung_qc: "Quảng cáo",
//     id_diem_dat: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
//     ten_cty: "TNVH HN",
//     email_cty: "pthn@gmail.com",
//     dien_thoai_cty: "19001001",
//     dia_chi_cty: "227 NCV, Q5, HCM",
//     ngay_hieu_luc: "12/11/2022 ",
//     ngay_het_han: "22/12/2023",
//     trang_thai: "Đã phê duyệt",
//     hinh_anh: "",
//   },
//   {
//     id_diem_dat: "3",
//     noi_dung_qc: "Quảng cáo",
//     id_diem_dat: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
//     ten_cty: "TNVH HN",
//     email_cty: "pthn@gmail.com",
//     dien_thoai_cty: "19001001",
//     dia_chi_cty: "227 NCV, Q5, HCM",
//     ngay_hieu_luc: "12/11/2022 ",
//     ngay_het_han: "22/12/2023",
//     trang_thai: "Đã hủy",
//     hinh_anh: "",
//   },
// ];

function AdsRequestPage() {
  const [selectedAds, setSelectedAds] =
    useState<AdsReqApi.ManyAdsRequestResponse | null>(null);
  const { data } = useGetAllAdsReqQuery();

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
  useEffect(() => {}, []);

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
