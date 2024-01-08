import { cloneElement as ReactCloneEle } from "react";
import MapLibreGL, { Map } from "maplibre-gl";
import { useEffect, useReducer, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "antd";

type MapSearchProps = {
  MapRef?: Map | null;
  refresh: number;
};

import AdsClusterMarker from "./AdsClusterMarker";

interface AdsMapProps<S extends MapSearchProps = MapSearchProps> {
  InitialPosition: {
    lng: number;
    lat: number;
    zoom: number;
  };

  AdsClusterInfo?: ReturnType<typeof AdsClusterMarker>;
  ReportClusterInfo?: ReturnType<typeof AdsClusterMarker>;
  SearchBar?: {
    func: (props: S) => JSX.Element;
    args: Parameters<(props: S) => JSX.Element>;
  };
  onMapDblClick: (lngLat: { lng: number; lat: number }) => void;
}

function AdsMap<S extends MapSearchProps = MapSearchProps>({
  SearchBar,
  InitialPosition,
  AdsClusterInfo,
  ReportClusterInfo,
  onMapDblClick,
}: AdsMapProps<S>) {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  // console.log(AdsClusterInfo, ReportClusterInfo);

  const [_adV, setAdsVisible] = useState<boolean>(true);
  const [_reV, setReprotVisible] = useState<boolean>(true);

  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  function initialize_map(container: HTMLElement) {
    if (mapRef.current) return;

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

    map.once("render", function () {
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
    if (!mapRef.current) return console.log("Invalid mapRef");
    if (!AdsClusterInfo) return console.log("Imavlid cluster info");
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.markerData.Uncluster.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.markerData.ClusterCount.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.props.markerData.Cluster.id,
      "visibility",
      visible
    );
    setAdsVisible(is_check);
  }

  function show_report_check_handler(is_check: boolean) {
    if (!mapRef.current) return console.log("Invalid mapRef");
    if (!ReportClusterInfo) return console.log("Imavlid cluster info");
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      ReportClusterInfo.props.markerData.Uncluster.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      ReportClusterInfo.props.markerData.ClusterCount.id,
      "visibility",
      visible
    );
    mapRef.current.setLayoutProperty(
      ReportClusterInfo.props.markerData.Cluster.id,
      "visibility",
      visible
    );
    setReprotVisible(is_check);
  }

  useEffect(function () {
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
  }, []);

  useEffect(
    function () {
      forceRefresh();
    },
    [AdsClusterInfo, ReportClusterInfo]
  );

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
      <div
        style={{
          position: "absolute",
          left: "1rem",
          right: "1rem",
          top: "2rem",
        }}
      >
        {SearchBar ? (
          <SearchBar.func
            {...SearchBar.args[0]}
            refresh={refresh}
            MapRef={mapRef.current}
          />
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
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "1rem",
          right: "1rem",
          flexDirection: "row",
          background: "rgba(239, 239, 239, 0.5)",
          padding: "0.5rem",
          display: "flex",
          gap: "2rem",
        }}
      >
        {!AdsClusterInfo ? null : (
          <div className="flex flex-row gap-x-2">
            <>
              <p className=" font-semibold">Hiện địa điểm quảng cáo</p>
              <Switch defaultChecked={true} onChange={show_ads_check_handler} />
            </>
          </div>
        )}
        {!ReportClusterInfo ? null : (
          <div className="flex flex-row gap-x-2">
            <>
              <p className=" font-semibold">Hiện địa điểm báo cáo</p>
              <Switch
                defaultChecked={true}
                onChange={show_report_check_handler}
              />
            </>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdsMap;
export type { AdsMapProps };
