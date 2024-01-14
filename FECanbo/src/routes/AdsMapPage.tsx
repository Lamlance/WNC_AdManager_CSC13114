import { AdsGeoJson } from "@admanager/shared";
import MapLibreGL from "maplibre-gl";
import z from "zod";
import {
  useGetAdsGeoJsonQuery,
  useGetReportGeoJsonQuery,
  useLazyGetAdsGeoJsonQuery,
  useLazyGetReportGeoJsonQuery,
} from "../slices/api/apiSlice";
import { ClusterCreateData } from "@admanager/frontend/src/utils/AddClusterPoint";
import { AdsClusterMarker, AdsMap } from "@admanager/frontend";
import MapSearchBar from "../components/AdsMap/MapSearch";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { Button } from "antd";
import AdsInfoModal from "../components/AdsMap/AdsInfoModal";

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

function AdsMapPage() {
  const [getAdsGeoJson, { data: adsGeoJson }] = useLazyGetAdsGeoJsonQuery();
  const [getReportGeoJson, { data: reportGeoJson }] =
    useLazyGetReportGeoJsonQuery();

  const authSate = useAppSelector((state) => state.auth);
  const [adsClusterCreateData, setAdsClusterCreate] =
    useState<ClusterCreateData | null>(null);
  const [reportClusterCreateData, setReportClusterCreate] =
    useState<ClusterCreateData | null>(null);
  const [selectedAds, setSelectedAds] =
    useState<AdsGeoJson.AdsGeoJsonProperty | null>(null);
  console.log(adsGeoJson, reportGeoJson, selectedAds);

  const [mapDblClick, setOnMapDblClick] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    console.log(adsGeoJson, reportGeoJson);
    if (adsGeoJson && adsGeoJson.features.length > 0) {
      setAdsClusterCreate(get_ad_cluster_createData(adsGeoJson) || null);
    }
    if (reportGeoJson && reportGeoJson.features.length > 0) {
      setReportClusterCreate(
        get_report_cluster_createData(reportGeoJson) || null,
      );
    }
  }, [adsGeoJson, reportGeoJson]);

  useEffect(() => {
    authSate.isLoggedIn
      ? getReportGeoJson({ phuong_id: authSate.user.managedWards })
      : getReportGeoJson({});
    authSate.isLoggedIn
      ? getAdsGeoJson({ phuong_id: authSate.user.managedWards })
      : getAdsGeoJson({});
  }, [authSate]);

  function get_ad_cluster_createData(data: AdsGeoJson.AdsGeoJson) {
    const AdsDataSoruce = !adsGeoJson
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo.DataSource, data: data };
    const AdsClusterInfo = !AdsDataSoruce
      ? undefined
      : { ...DefaultMapProps.AdsClusterInfo, DataSource: { ...AdsDataSoruce } };
    return AdsClusterInfo;
  }

  function get_report_cluster_createData(data: AdsGeoJson.ReportGeoJson) {
    if (!reportGeoJson) return;
    const ReportClusterCreate: ClusterCreateData = {
      DataSource: { id: "report_data", data: data },
      Cluster: { id: "report_cluster", color: "#FF6961" },
      ClusterCount: { id: "report_cluster_count" },
      Uncluster: { id: "report_unclustered_point", color: "#ff948f" },
    };
    return ReportClusterCreate;
  }

  function handleUpdatePlaceChangeEvent() {
    authSate.isLoggedIn
      ? getReportGeoJson({ phuong_id: authSate.user.managedWards })
      : getReportGeoJson({});
    authSate.isLoggedIn
      ? getAdsGeoJson({ phuong_id: authSate.user.managedWards })
      : getAdsGeoJson({});
  }

  function on_ads_marker_click(data: AdsGeoJson.AdsGeoJsonProperty) {
    console.log(data);
    setSelectedAds(data);
  }

  useEffect(() => {
    document.addEventListener(
      "AdsManager:UpdatePlaceChangeEvent",
      handleUpdatePlaceChangeEvent,
    );
    return () => {
      document.removeEventListener(
        "AdsManager:UpdatePlaceChangeEvent",
        handleUpdatePlaceChangeEvent,
        true,
      );
    };
  }, []);

  const AdsCluster = !adsClusterCreateData ? undefined : (
    <AdsClusterMarker<typeof AdsGeoJson.AdsGeoJsonPropertySchema>
      geoJsonPropertySchema={AdsGeoJson.AdsGeoJsonPropertySchema}
      markerData={adsClusterCreateData}
      onMarkerClick={(data) => on_ads_marker_click(data)}
      popUpBuilder={createAdPopup}
    />
  );

  const ReportCluster = !reportClusterCreateData ? undefined : (
    <AdsClusterMarker<typeof GeoPropArr>
      geoJsonPropertySchema={GeoPropArr}
      markerData={reportClusterCreateData}
      onMarkerClick={(d) => console.log(d)}
      popUpBuilder={createReportPopup}
    />
  );

  return (
    <>
      {selectedAds && (
        <AdsInfoModal
          data={selectedAds}
          isShow={!!selectedAds}
          onClose={() => setSelectedAds(null)}
        />
      )}
      <Button onClick={() => handleUpdatePlaceChangeEvent()}> ♻️ </Button>
      <div className=" relative h-full w-full">
        <AdsMap
          SearchBar={{
            func: MapSearchBar,
            args: [
              {
                onPlaceSelect: (place) => {
                  console.log(place);
                },
                initPos: DefaultMapProps.InitialPosition,
              },
            ],
          }}
          InitialPosition={DefaultMapProps.InitialPosition}
          AdsClusterInfo={AdsCluster}
          ReportClusterInfo={ReportCluster}
          onMapDblClick={(coord) => setOnMapDblClick(coord)}
        />
      </div>
    </>
  );
}

export default AdsMapPage;
