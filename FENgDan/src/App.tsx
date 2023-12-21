import { useEffect, useRef, useState } from "react";
import "./App.css";
import AdsMap from "./components/AdsMap";
import Sidebar from "./components/Sidebar";
import ReduxStore from "./Redux/ReduxStore";
import { Provider } from "react-redux";
import { useGetAdsGeoJson } from "./Redux/GeoJsonSlice";
import { AdsGeoJson } from "@admanager/shared";
import { ClusterCreateData } from "./utils/AddClusterPoint";
import { REPORT_KEY } from "./models/report_form_values";
import { z } from "zod";

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

function App() {
  const { data, error } = useGetAdsGeoJson();
  const [reportData, setReportData] = useState<ClusterCreateData>();

  const AdsDataSoruce = !data
    ? undefined
    : { ...DefaultMapProps.AdsClusterInfo.DataSource, data };
  const AdsClusterInfo = !AdsDataSoruce
    ? undefined
    : { ...DefaultMapProps.AdsClusterInfo, DataSource: { ...AdsDataSoruce } };

  function get_local_report_data() {
    const oldReport = localStorage.getItem(REPORT_KEY);
    if (!oldReport) return;

    const reportData = z
      .array(AdsGeoJson.ReportGeoJsonPropertySchema)
      .safeParse(JSON.parse(oldReport));
    if (reportData.success == false) return console.warn(reportData.error);
    const reportFeature: AdsGeoJson.ReportGeoJson["features"] =
      reportData.data.map(
        (v) =>
          ({
            type: "Feature",
            properties: v,
            geometry: { type: "Point", coordinates: [v.lng, v.lat, 0] },
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
    setReportData(ReportClusterCreate);
  }

  useEffect(() => {
    try {
      get_local_report_data();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <AdsMap
        InitialPosition={DefaultMapProps.InitialPosition}
        AdsClusterInfo={AdsClusterInfo}
        ReportClusterInfo={reportData}
      />
      {/* {sidebarVisible && <Sidebar openSidebar={closeSidebar} />} */}
      <Sidebar />
    </div>
  );
}

export default function () {
  useEffect(() => {
    const head = document.querySelector("head");
    if (!head) {
      return;
    }
    const tailWindStyleTag = [...head.querySelectorAll("style")].find((style) =>
      style.innerHTML.includes("tailwind"),
    );
    if (tailWindStyleTag) {
      head.insertAdjacentElement("afterbegin", tailWindStyleTag);
    }
  }, []);
  return (
    <Provider store={ReduxStore}>
      <App />
    </Provider>
  );
}
