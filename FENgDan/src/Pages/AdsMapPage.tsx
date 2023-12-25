import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useGetAdsGeoJson } from "../Redux/GeoJsonSlice";
import { useAppSelector, useAppDispatch } from "../Redux/ReduxStore";
import { addReportData, setSelectedReport } from "../Redux/ReportsDataSlice";
import { REPORT_KEY } from "../models/report_form_values";
import { ClusterCreateData } from "../utils/AddClusterPoint";
import MapLibreGL from "maplibre-gl";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import { setDblClick } from "../Redux/MapClickSlice";
import { AdsClusterMarker, AdsMap } from "@admanager/frontend";
import MapSearchBar from "../components/AdsMap/MapSearch";

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
  data: AdsGeoJson.ReportGeoJsonProperty,
  coord: [number, number],
) {
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
  const { data, error } = useGetAdsGeoJson();
  const reportGeoProperty = useAppSelector((state) => state.ReportsData.data);
  const dispatch = useAppDispatch();

  function get_ad_cluster_createData() {
    const AdsDataSoruce = !data
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo.DataSource, data };
    const AdsClusterInfo = !AdsDataSoruce
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo, DataSource: { ...AdsDataSoruce } };
    return AdsClusterInfo;
  }

  function get_local_report_data() {
    const oldReport = localStorage.getItem(REPORT_KEY);
    if (!oldReport) return;

    const reportData = z
      .array(AdsGeoJson.ReportGeoJsonPropertySchema)
      .safeParse(JSON.parse(oldReport));
    if (reportData.success == false) return console.warn(reportData.error);
    dispatch(addReportData(reportData.data));
  }

  function get_report_cluster_createData() {
    if (reportGeoProperty.length === 0) return undefined;
    const reportFeature: AdsGeoJson.ReportGeoJson["features"] =
      reportGeoProperty.map(
        (v) =>
          ({
            type: "Feature",
            properties: [v],
            geometry: {
              type: "Point",
              coordinates: [v.bao_cao.lng, v.bao_cao.lat, 0],
            },
          }) as const,
      );
    const ReportGeoJson: AdsGeoJson.ReportGeoJson = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84",
        },
      },
      features: reportFeature,
    };
    const ReportClusterCreate: ClusterCreateData = {
      DataSource: { id: "report_data", data: ReportGeoJson },
      Cluster: { id: "report_cluster", color: "#FF6961" },
      ClusterCount: { id: "report_cluster_count" },
      Uncluster: { id: "report_unclustered_point", color: "#ff948f" },
    };
    return ReportClusterCreate;
  }

  useEffect(() => {
    try {
      get_local_report_data();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  function handle_ads_marker_click(data: AdsGeoJson.AdsGeoJsonProperty) {
    dispatch(setSelectedAdsLocation(data));
  }

  function handle_report_marker_click(data: AdsGeoJson.ReportGeoJsonProperty) {
    dispatch(setSelectedReport([data]));
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
    <AdsClusterMarker<typeof AdsGeoJson.ReportGeoJsonPropertySchema>
      geoJsonPropertySchema={AdsGeoJson.ReportGeoJsonPropertySchema}
      markerData={ReportClusterData}
      onMarkerClick={handle_report_marker_click}
      popUpBuilder={createReportPopup}
    />
  );

  return (
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
  );
}
