import { Button } from "antd";
import AdsDetail from "./AdsDetail";
import ReportModal from "./ReportModal";
import { useState } from "react";
import { ReportFormValues } from "../models/report_form_values";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAppSelector } from "../Redux/ReduxStore";
import AdsDetail from "./AdsDetail";
import { AdsGeoJson } from "@admanager/shared";

function AdItem(props: AdsGeoJson.AdsProperty) {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleReportClick = () => {
    setIsReportModalVisible(true);
  };

  const handleReportModalCancel = () => {
    setIsReportModalVisible(false);
  };

  const handleReportModalSubmit = (values: ReportFormValues) => {
    console.log("Report form submitted with values:", values);
    setIsReportModalVisible(false);
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="ads-info-container relative ">
      <div className="ads-info-popup absolute w-full rounded-xl border-opacity-90 p-4 shadow-lg">
        <div className="ads-info-content">
          <p className=" text-lg font-bold">Trụ, cụm Pano</p>
          <p className="ads_info_location text-base">
            42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu
          </p>
          <p className="text-base">
            <span className=" font-semibold">Loại bảng: </span> Trụ bảng hiflex
          </p>
          <p className="text-base">
            <span className="font-semibold">Kích thước: </span> 2.5m x 10m
          </p>
          <p className="text-base">
            <span className="font-semibold">Hình thức: </span> Quảng cáo thương
            mại
          </p>
          <p className="text-base">
            <span className="font-semibold">Phân loại: </span> Nhà ở riêng lẻ
          </p>
          <p className="text-base">
            <span className="font-semibold">Số lượng: </span> 2 trụ/bảng
          </p>
          <p className="mt-1 text-base font-bold italic">Đã quy hoạch</p>


          <AdsDetail
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />

          <ReportModal
            visible={isReportModalVisible}
            onCancel={handleReportModalCancel}
            onSubmit={handleReportModalSubmit}
            reportFormValues={{} as ReportFormValues}
          />

          <div className="mt-4 flex justify-end">
            <InfoCircleOutlined
              onClick={showModal}
              className=" mt-2 cursor-pointer"
              style={{ fontSize: "18px", color: "#1677ff" }}
            />
            <Button
              type="primary"
              danger
              onClick={handleReportClick}
              className=" ml-auto mr-2"
            >
              Báo cáo vi phạm
            </Button>

            <Button type="primary" onClick={handleRegisterClick}>
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdsInfos() {
  const selected = useAppSelector((state) => state.SelectedAds);

  return (
    <>
      {!selected ? (
        <div>No ads data available</div>
      ) : (
        selected.ads.map((v) => <AdItem {...v} key={v.dia_chi} />)
      )}
    </>
  );
}

export default AdsInfos;
