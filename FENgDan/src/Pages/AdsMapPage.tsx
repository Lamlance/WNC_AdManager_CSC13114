import { AdsGeoJson, ReportApi, SocketIoApi } from "@admanager/shared";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useAppSelector, useAppDispatch } from "../Redux/ReduxStore";
import { setSelectedReport } from "../Redux/ReportsDataSlice";
import { REPORT_KEY } from "../models/report_form_values";
import { ClusterCreateData } from "../utils/AddClusterPoint";
import MapLibreGL from "maplibre-gl";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import { setDblClick } from "../Redux/MapClickSlice";
import { AdsClusterMarker, AdsMap } from "@admanager/frontend";
import MapSearchBar from "../components/AdsMap/MapSearch";
import {
  useGetAdsGeoJson,
  useGetReportGeoJson,
  useLazyGetReportGeoJson,
} from "../Redux/AdsServerApi";
import { notification } from "antd";
const DefaultMapProps = {
  InitialPosition: {
    lng: 106.69379445290143,
    lat: 10.788266281491206,
    zoom: 14,
  },
  AdsClusterInfo: {
    DataSource: { id: "ads_data" },
    Cluster: { id: "ads_cluster", color: "#51bbd6" },
    ClusterCount: { id: "ads_cluster_count" },
    Uncluster: { id: "ads_unclustered_point", color: "#11b4da" },
  },
};

const GeoPropArr = z.array(AdsGeoJson.ReportGeoJsonPropertySchema);

function createAdPopup(
  data: AdsGeoJson.AdsGeoJsonProperty,
  coord: [number, number],
) {
  return new MapLibreGL.Popup()
    .setLngLat(coord)
    .setMaxWidth("500px")
    .setHTML(
      `<div class="text-lg">
      <h1 class="font-bold">${data.place.ten_dia_diem}</h1>
      <p>${data.ads[0].loai_vitri}</p>
      <p>${data.ads[0].hinh_thuc}</p>
      <p>${data.place.dia_chi}</p>
      <h4 class="font-bold italic">${
        data.ads[0].quy_hoach ? "Đã quy hoạch" : "Chưa quy hoạch"
      }</h4>
    </div>`,
    );
}

function createReportPopup(
  reports: z.infer<typeof GeoPropArr>,
  coord: [number, number],
) {
  const data = reports[0];
  return new MapLibreGL.Popup().setLngLat(coord).setMaxWidth("500px")
    .setHTML(`<div class="text-lg">
      <h1 class="font-bold">${
        data.dia_diem?.ten_dia_diem || data.bao_cao.dia_chi
      }</h1>
      <p>Báo cáo: ${data.loai_bao_cao}</p>
      <p class=" line-clamp-4">${data.bao_cao.noi_dung}</p>
    </div>`);
}

export default function AdsMapPage() {
  const { data: adsGeoJson, error } = useGetAdsGeoJson();
  const [getReportData, { data: reportGeoJson }] = useLazyGetReportGeoJson();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  function get_ad_cluster_createData() {
    const AdsDataSoruce = !adsGeoJson
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo.DataSource, data: adsGeoJson };
    const AdsClusterInfo = !AdsDataSoruce
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo, DataSource: { ...AdsDataSoruce } };
    return AdsClusterInfo;
  }

  function get_report_cluster_createData() {
    if (!reportGeoJson) return;
    const ReportClusterCreate: ClusterCreateData = {
      DataSource: { id: "report_data", data: reportGeoJson },
      Cluster: { id: "report_cluster", color: "#FF6961" },
      ClusterCount: { id: "report_cluster_count" },
      Uncluster: { id: "report_unclustered_point", color: "#ff948f" },
    };
    return ReportClusterCreate;
  }

  function handle_ads_marker_click(data: AdsGeoJson.AdsGeoJsonProperty) {
    dispatch(setSelectedAdsLocation(data));
  }

  function handle_report_marker_click(data: z.infer<typeof GeoPropArr>) {
    console.log(data);
    dispatch(setSelectedReport(data));
  }

  const AdsClusterData = get_ad_cluster_createData();
  const AdsCluster = !AdsClusterData ? undefined : (
    <AdsClusterMarker<typeof AdsGeoJson.AdsGeoJsonPropertySchema>
      geoJsonPropertySchema={AdsGeoJson.AdsGeoJsonPropertySchema}
      markerData={AdsClusterData}
      onMarkerClick={handle_ads_marker_click}
      popUpBuilder={createAdPopup}
    />
  );

  const ReportClusterData = get_report_cluster_createData();
  const ReportCluster = !ReportClusterData ? undefined : (
    <AdsClusterMarker<typeof GeoPropArr>
      geoJsonPropertySchema={GeoPropArr}
      markerData={ReportClusterData}
      onMarkerClick={handle_report_marker_click}
      popUpBuilder={createReportPopup}
    />
  );

  function handleCreateReportEvent() {
    getReportData();
    api.info({
      message: "Đã tạo báo cáo",
      placement: "topRight",
      duration: 0,
    });
  }

  function handleUpdateReportEvent(
    e: SocketIoApi.CustomEventMap["AdsManager:UpdateReportEvent"],
  ) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = e.detail?.phan_hoi || "";
    const text_phanhoi = tmp.textContent || tmp.innerText || "";
    tmp.remove();

    api.info({
      message: `Báo cáo đã được ${e.detail?.trang_thai}`,
      description: `Báo cáo tại ${e.detail?.dia_chi} được phản hồi "${text_phanhoi}"`,
      placement: "topRight",
      duration: 0,
    });
    getReportData();
  }

  useEffect(() => {
    getReportData();
    document.addEventListener(
      "AdsManager:CreateReportEvent",
      handleCreateReportEvent,
    );
    document.addEventListener(
      "AdsManager:UpdateReportEvent",
      handleUpdateReportEvent,
    );
    return () => {
      document.removeEventListener(
        "AdsManager:CreateReportEvent",
        handleCreateReportEvent,
        true,
      );
      document.removeEventListener(
        "AdsManager:UpdateReportEvent",
        handleUpdateReportEvent,
        true,
      );
    };
  }, []);

  return (
    <>
      {contextHolder}
      <AdsMap
        SearchBar={{
          func: MapSearchBar,
          args: [{ refresh: 0 }],
        }}
        onMapDblClick={(data) => dispatch(setDblClick(data))}
        InitialPosition={DefaultMapProps.InitialPosition}
        AdsClusterInfo={AdsCluster}
        ReportClusterInfo={ReportCluster}
      />
    </>
  );
}
