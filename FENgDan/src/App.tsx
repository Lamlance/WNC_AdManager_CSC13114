import { useEffect, useRef, useState } from "react";
import "./App.css";
import AdsMap from "./components/AdsMap";
import Sidebar from "./components/Sidebar";
import ReduxStore from "./Redux/ReduxStore";
import { Provider } from "react-redux";
import { useGetAdsGeoJson } from "./Redux/GeoJsonSlice";

const DefaultMapProps = {
  InitialPosition: {
    lng: 106.69379445290143,
    lat: 10.788266281491206,
    zoom: 14,
  },
  AdsClusterInfo: {
    DataSource: {
      id: "ads_data",
    },
    Cluster: {
      id: "ads_cluster",
      color: "#51bbd6",
    },
    ClusterCount: { id: "ads_cluster_count" },
    Uncluster: { id: "ads_unclustered_point", color: "#11b4da" },
  },
};

function App() {
  const { data, error } = useGetAdsGeoJson();
  const AdsDataSoruce = !data
    ? undefined
    : { ...DefaultMapProps.AdsClusterInfo.DataSource, data };
  const AdsClusterInfo = !AdsDataSoruce
    ? undefined
    : { ...DefaultMapProps.AdsClusterInfo, DataSource: { ...AdsDataSoruce } };
  return (
    <div className="h-screen w-screen">
      <AdsMap
        InitialPosition={DefaultMapProps.InitialPosition}
        AdsClusterInfo={AdsClusterInfo}
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
