import { cloneElement as ReactCloneEle } from "react";
import MapLibreGL, { Map } from "maplibre-gl";
import { useEffect, useReducer, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "antd";
import "../../css/tailwind.css";

type MapSearchProps = {
  MapRef?: Map | null;
  refresh: number;
};

import AdsClusterMarker from "./AdsClusterMarker";

interface AdsMapProps {
  InitialPosition: {
    lng: number;
    lat: number;
    zoom: number;
  };

  AdsClusterInfo?: ReturnType<typeof AdsClusterMarker>;
  ReportClusterInfo?: ReturnType<typeof AdsClusterMarker>;
  SearchBar?: (props: MapSearchProps) => JSX.Element;
  onMapDblClick: (lngLat: { lng: number; lat: number }) => void;
}

function AdsMap({
  SearchBar,
  InitialPosition,
  AdsClusterInfo,
  ReportClusterInfo,
  onMapDblClick,
}: AdsMapProps) {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  // console.log(AdsClusterInfo, ReportClusterInfo);

  const [_, setAdsVisible] = useState<boolean>(true);

  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  function initialize_map(container: HTMLElement) {
    if (mapRef.current)
      return console.log(
        "Map already initalize",
        mapRef.current.getSource("ads_data")
      );
    const token = (import.meta as any).env.VITE_LOCATION_IQ_KEY;
    if (!token) return;

    const url = `https://tiles.locationiq.com/v3/streets/vector.json?key=${token}`;

    const map = new MapLibreGL.Map({
      container: container,
      style: url,
      zoom: InitialPosition.zoom,
      center: [InitialPosition.lng, InitialPosition.lat],
      doubleClickZoom: false,
    });

    map.once("load", function () {
      mapRef.current = map;
      //initialize_ads_markers();
      mapRef.current.addControl(
        new MapLibreGL.GeolocateControl({ trackUserLocation: true })
      );
      mapRef.current.on("dblclick", function (e) {
        onMapDblClick?.({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      });
      onMapDblClick?.({ ...InitialPosition });
      forceRefresh();
    });
  }

  function show_ads_check_handler(is_check: boolean) {
    if (!mapRef.current) return;
    if (!AdsClusterInfo) return;
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.Uncluster.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.ClusterCount.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.Cluster.id,
      "visibility",
      visible
    );
    setAdsVisible(is_check);
  }

  useEffect(function () {
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
  }, []);

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
      <div
        className=" absolute left-4 right-4 top-4"
        style={{
          position: "absolute",
          left: "1rem",
          right: "1rem",
          top: "2rem",
        }}
      >
        {SearchBar ? (
          <SearchBar refresh={refresh} MapRef={mapRef.current} />
        ) : null}
        {!AdsClusterInfo || !mapRef.current || refresh <= 0
          ? null
          : ReactCloneEle(AdsClusterInfo, {
              ...AdsClusterInfo.props,
              mapRef: mapRef.current,
            })}
        {!ReportClusterInfo || !mapRef.current || refresh <= 0
          ? null
          : ReactCloneEle(ReportClusterInfo, {
              ...ReportClusterInfo.props,
              mapRef: mapRef.current,
            })}
      </div>
      <div className=" absolute bottom-2 left-4 right-4 flex flex-row bg-white bg-opacity-80 p-2">
        <div className="flex flex-row gap-x-2">
          {!AdsClusterInfo ? null : (
            <>
              <p className=" font-semibold">Hiện địa điểm quảng cáo</p>
              <Switch defaultChecked={true} onChange={show_ads_check_handler} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdsMap;
export type { AdsMapProps };
