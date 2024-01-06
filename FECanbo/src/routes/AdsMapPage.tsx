import { AdsGeoJson } from "@admanager/shared";
import MapLibreGL from "maplibre-gl";
import z from "zod";
import {
  useGetAdsGeoJsonQuery,
  useGetReportGeoJsonQuery,
} from "../slices/api/apiSlice";
import { ClusterCreateData } from "@admanager/frontend/src/utils/AddClusterPoint";
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
  const { data: adsGeoJson, error } = useGetAdsGeoJsonQuery();
  const { data: reportGeoJson } = useGetReportGeoJsonQuery();

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

  const AdsClusterData = get_ad_cluster_createData();
  const AdsCluster = !AdsClusterData ? undefined : (
    <AdsClusterMarker<typeof AdsGeoJson.AdsGeoJsonPropertySchema>
      geoJsonPropertySchema={AdsGeoJson.AdsGeoJsonPropertySchema}
      markerData={AdsClusterData}
      popUpBuilder={createAdPopup}
    />
  );

  const ReportClusterData = get_report_cluster_createData();
  const ReportCluster = !ReportClusterData ? undefined : (
    <AdsClusterMarker<typeof GeoPropArr>
      geoJsonPropertySchema={GeoPropArr}
      markerData={ReportClusterData}
      popUpBuilder={createReportPopup}
    />
  );

  return (
    <div className=" relative h-full w-full">
      <AdsMap
        SearchBar={{
          func: MapSearchBar,
          args: [
            {
              refresh: 0,
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
        onMapDblClick={(coord) => console.log(coord)}
      />
    </div>
  );
}

export default AdsMapPage;
