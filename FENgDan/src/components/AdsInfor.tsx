import { Button, UploadFile } from "antd";
import ReportModal, { ReportFormPropery } from "./ReportModal";
import { useState } from "react";
import { REPORT_KEY } from "../models/report_form_values";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxStore";
import AdsDetail from "./AdsDetail";
import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { z } from "zod";
import { addReportData } from "../Redux/ReportsDataSlice";
import { uploadReportData } from "../Redux/AdsServerApi";

interface EmptyAdItemProps {
  Place: ReportApi.ReportPlace;
  onReportSubmit: (
    report: ReportApi.ReportFormValues,
    place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace,
    ad?: AdsGeoJson.AdsProperty,
  ) => void;
}

interface AdsItemProps {
  Ad: AdsGeoJson.AdsProperty;
  Place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace;

  onReportSubmit: (
    report: ReportFormPropery,
    place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace,
    ad?: AdsGeoJson.AdsProperty,
  ) => void;
}

function EmptyAdItem({ Place, onReportSubmit }: EmptyAdItemProps) {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReportClick = () => {
    setIsReportModalVisible(true);
  };

  const handleReportModalCancel = () => {
    setIsReportModalVisible(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleReportModalSubmit = (values: ReportFormPropery) => {
    console.log("Report form submitted with values:", values);
    setIsReportModalVisible(false);
    onReportSubmit(values, Place);
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
  };

  return (
    <div className="ads-info-container relative ">
      <div className="ads-info-popup absolute w-full rounded-xl border-opacity-90 p-4 shadow-lg">
        <div className="ads-info-content">
          <p className="ads_info_location text-base">{Place.dia_chi}</p>
          <p className="text-base">
            <span className="font-semibold">{`Hiện chưa có dữ liệu quảng cáo`}</span>
          </p>

          <ReportModal
            visible={isReportModalVisible}
            onCancel={handleReportModalCancel}
            onSubmit={handleReportModalSubmit}
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

function AdItem({ Ad, Place, onReportSubmit }: AdsItemProps) {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleReportClick = () => {
    setIsReportModalVisible(true);
  };

  const handleReportModalCancel = () => {
    setIsReportModalVisible(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleReportModalSubmit = (values: ReportApi.ReportFormValues) => {
    console.log("Report form submitted with values:", values);
    setIsReportModalVisible(false);
    onReportSubmit(values, Place, Ad);
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
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
          <p className=" text-lg font-bold">{Ad.bang_qc}</p>
          <p className="ads_info_location text-base">{Place.dia_chi}</p>
          <p className="text-base">
            <span className="font-semibold">Kích thước: </span>{" "}
            {`${Ad.chieu_dai_m}m x ${Ad.chieu_rong_m}m`}
          </p>
          <p className="text-base">
            <span className="font-semibold">Hình thức: </span> {Ad.hinh_thuc}
          </p>
          <p className="text-base">
            <span className="font-semibold">Phân loại: </span> {Ad.loai_vitri}
          </p>
          <p className="text-base">
            <span className="font-semibold">Số lượng: </span>{" "}
            {`${Ad.so_luong} trụ/bảng`}
          </p>
          <p className="mt-1 text-base font-bold italic">Đã quy hoạch</p>

          <AdsDetail
            Place={Place}
            Ad={Ad}
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />

          <ReportModal
            visible={isReportModalVisible}
            onCancel={handleReportModalCancel}
            onSubmit={handleReportModalSubmit}
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
  const [uploadReport, data] = uploadReportData();
  const dispatch = useAppDispatch();

  const onReportSubmit: AdsItemProps["onReportSubmit"] = async (
    report,
    place,
    ad,
  ) => {
    try {
      console.log(report, place, ad);
      const oldReport = z
        .array(AdsGeoJson.ReportGeoJsonPropertySchema)
        .safeParse(JSON.parse(localStorage.getItem(REPORT_KEY) || "[]"));
      if (oldReport.success == false) return console.log(oldReport.error);

      const formData = new FormData();
      Object.entries(report).forEach(([k, v]) => {
        if (!v) return;
        if ((k as keyof ReportFormPropery) === "images") {
          const files = v as UploadFile[];
          files.forEach((f) => {
            if (f.originFileObj) {
              console.log(f.originFileObj);
              formData.append("hinh_anh", f.originFileObj);
            }
          });
          return;
        }
        formData.append(k, v.toString());
      });

      Object.entries(place).forEach(([k, v]) => {
        if (!v) return;
        formData.append(k, v.toString());
      });

      if (ad?.id_quang_cao) {
        formData.append("id_quang_cao", ad.id_quang_cao);
      }

      try {
        const geojson = await uploadReport(formData).unwrap();
        oldReport.data.push(geojson);
        localStorage.setItem(REPORT_KEY, JSON.stringify(oldReport.data));
        dispatch(addReportData([geojson]));
      } catch (e) {
        console.warn(e);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      {!selected ? null : selected.ads.length == 0 ? (
        <EmptyAdItem onReportSubmit={onReportSubmit} Place={selected.place} />
      ) : (
        selected.ads.map((v, i) => (
          <AdItem
            onReportSubmit={onReportSubmit}
            Ad={v}
            Place={selected.place}
            key={`${selected.place.dia_chi}_${i}`}
          />
        ))
      )}
    </>
  );
}

export default AdsInfos;
