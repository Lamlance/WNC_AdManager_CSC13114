import MapLibreGL, { Map, Popup } from "maplibre-gl";
import { useEffect, useReducer, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "antd";
import { ClusterCreateData } from "../utils/AddClusterPoint";
import { useAppDispatch } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import MapSearchBar from "./AdsMap/MapSearch";
import { setDblClick } from "../Redux/MapClickSlice";
import { AdsGeoJson } from "@admanager/shared";
import AdsClusterMarker from "./AdsMap/AdsClusterMarker";
interface AdsMapProps {
  InitialPosition: {
    lng: number;
    lat: number;
    zoom: number;
  };

  AdsClusterInfo?: ClusterCreateData;
  ReportClusterInfo?: ClusterCreateData;

  onMapDblClick?: (lngLat: { lng: number; lat: number }) => void;
}

function AdsMap({
  InitialPosition,
  AdsClusterInfo,
  ReportClusterInfo,
  onMapDblClick,
}: AdsMapProps) {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const dispatch = useAppDispatch();

  // console.log(AdsClusterInfo, ReportClusterInfo);

  const [_, setAdsVisible] = useState<boolean>(true);

  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  function make_info_maker(
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

  function handle_ads_marker_click(data: AdsGeoJson.AdsGeoJsonProperty) {
    dispatch(setSelectedAdsLocation(data));
  }

  function initialize_map(container: HTMLElement) {
    if (mapRef.current)
      return console.log(
        "Map already initalize",
        mapRef.current.getSource("ads_data"),
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
        new MapLibreGL.GeolocateControl({ trackUserLocation: true }),
      );
      mapRef.current.on("dblclick", function (e) {
        dispatch(setDblClick({ lng: e.lngLat.lng, lat: e.lngLat.lat }));
        onMapDblClick?.({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      });
      dispatch(setDblClick({ ...InitialPosition }));
      forceRefresh();
    });
  }

  function show_ads_check_handler(is_check: boolean) {
    if (!mapRef.current) return;
    if (!AdsClusterInfo) return;
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.Uncluster.id,
      "visibility",
      visible,
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.ClusterCount.id,
      "visibility",
      visible,
    );
    mapRef.current.setLayoutProperty(
      AdsClusterInfo.Cluster.id,
      "visibility",
      visible,
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
      <div className=" absolute left-4 right-4 top-4">
        <MapSearchBar refresh={refresh} MapRef={mapRef.current} />
        {!AdsClusterInfo || !mapRef.current || refresh <= 0 ? null : (
          <AdsClusterMarker<typeof AdsGeoJson.AdsGeoJsonPropertySchema>
            geoJsonPropertySchema={AdsGeoJson.AdsGeoJsonPropertySchema}
            mapRef={mapRef}
            markerData={AdsClusterInfo}
            onMarkerClick={handle_ads_marker_click}
            popUpBuilder={make_info_maker}
          />
        )}
        {!ReportClusterInfo || !mapRef.current || refresh <= 0 ? null : (
          <AdsClusterMarker<typeof AdsGeoJson.ReportGeoJsonPropertySchema>
            geoJsonPropertySchema={AdsGeoJson.ReportGeoJsonPropertySchema}
            mapRef={mapRef}
            markerData={ReportClusterInfo}
            onMarkerClick={(v) => console.log(v)}
            popUpBuilder={() => new Popup()}
          />
        )}
      </div>
      <div className=" absolute bottom-2 left-4 right-4 flex flex-row bg-white bg-opacity-80 p-2">
        <div className="flex flex-row gap-x-2">
          <p className=" font-semibold">Hiện địa điểm quảng cáo</p>
          <Switch defaultChecked={true} onChange={show_ads_check_handler} />
        </div>
      </div>
    </div>
  );
}
export default AdsMap;
export type { AdsMapProps };
