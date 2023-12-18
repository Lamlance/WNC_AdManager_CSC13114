import MapLibreGL, { Map, Popup } from "maplibre-gl";
import { useEffect, useReducer, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { z } from "zod";
import { Switch } from "antd";
import { AddClusterPoints, ClusterCreateData } from "../utils/AddClusterPoint";
import { AdsMarkerInfoSchema } from "../models/mock_markers";
import { useAppDispatch } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import MapSearchBar from "./AdsMap/MapSearch";
import { setDblClick } from "../Redux/MapClickSlice";

interface AdsMapProps {
  InitialPosition?: {
    lng: number;
    lat: number;
    zoom: number;
  };

  AdsClusterInfo?: ClusterCreateData;
  ReportClusterInfo?: ClusterCreateData;

  onMapDblClick?: (lngLat: { lng: number; lat: number }) => void;
}

const DefaultProps = {
  InitialPosition: {
    lng: 106.69379445290143,
    lat: 10.788266281491206,
    zoom: 14,
  },
  AdsClusterInfo: {
    DataSource: {
      id: "ads_data",
      url: "http://localhost:5173/MockMarker.json",
    },
    Cluster: {
      id: "ads_cluster",
      color: "#51bbd6",
    },
    ClusterCount: { id: "ads_cluster_count" },
    Uncluster: { id: "ads_unclustered_point", color: "#11b4da" },
  },
};

function AdsMap({
  InitialPosition = DefaultProps.InitialPosition,
  AdsClusterInfo = DefaultProps.AdsClusterInfo,
  ReportClusterInfo,
  onMapDblClick,
}: AdsMapProps) {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const popUpRef = useRef<Popup | null>(null);
  const dispatch = useAppDispatch();

  const [_, setAdsVisible] = useState<boolean>(true);

  const [refresh, forceRefresh] = useReducer((x) => !x, false);

  function make_info_maker(
    data: z.infer<typeof AdsMarkerInfoSchema>,
    coord: [number, number],
  ) {
    if (!mapRef.current) return;
    if (data.ads.length <= 0) return;
    popUpRef.current = new MapLibreGL.Popup()
      .setLngLat(coord)
      .setMaxWidth("500px")
      .setHTML(
        `<div class="text-lg">
        <h1 class="font-bold">${data.ads[0].hinh_thuc}</h1>
        <p>${data.ads[0].loai_vitri}</p>
        <p>${data.ads[0].hinh_thuc}</p>
        <p>${data.ads[0].dia_chi}</p>
        <h4 class="font-bold italic">${
          data.ads[0].quy_hoach ? "Đã quy hoạch" : "Chưa quy hoạch"
        }</h4>
      </div>`,
      )
      .addTo(mapRef.current);
  }

  function initialize_ads_markers(map: Map) {
    // const geo_json_url =
    //   //(import.meta as any).env.VITE_GEOJSON_URL ||
    //   "http://localhost:5173/MockMarker.json";
    // console.log("Geo json url", geo_json_url);

    if (AdsClusterInfo) {
      AddClusterPoints(map, AdsClusterInfo);
      map.on("click", AdsClusterInfo.Uncluster.id, function (e) {
        const points = e.features?.[0].geometry;
        if (!points) return;
        const marker_data = AdsMarkerInfoSchema.safeParse(
          e.features?.[0].properties,
        );

        if (marker_data.success == false) return;
        make_info_maker(marker_data.data, [e.lngLat.lng, e.lngLat.lat]);

        console.log("You click a mark", marker_data.data.ads[0].ten_dia_diem);
        dispatch(setSelectedAdsLocation(marker_data.data));
      });

      map.on("mouseenter", AdsClusterInfo.Uncluster.id, function (e) {
        const points = e.features?.[0].geometry;
        if (!points) return;
        map.getCanvas().style.cursor = "pointer";

        const [lng, lat] = (points as GeoJSON.Point).coordinates.slice();
        const marker_data = AdsMarkerInfoSchema.safeParse(
          e.features?.[0].properties,
        );
        if (marker_data.success == false) return;
        make_info_maker(marker_data.data, [lng, lat]);
      });

      map.on("mouseleave", AdsClusterInfo.Uncluster.id, function () {
        popUpRef.current?.remove();
      });
    }
    if (ReportClusterInfo) AddClusterPoints(map, ReportClusterInfo);
  }

  function initialize_map_control(map: Map) {
    const control = new MapLibreGL.GeolocateControl({
      trackUserLocation: true,
    });
    map.addControl(control);
  }

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

    map.once("load", function () {
      initialize_ads_markers(map);
      initialize_map_control(map);

      map.on("dblclick", function (e) {
        dispatch(setDblClick({ lng: e.lngLat.lng, lat: e.lngLat.lat }));
        onMapDblClick?.({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      });
    });

    mapRef.current = map;

    //mock_coord.forEach((m) => create_marker(m));
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
    dispatch(setDblClick({ ...InitialPosition }));
    forceRefresh();
  }, []);

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
      <div className=" absolute left-4 right-4 top-4">
        <MapSearchBar refresh={refresh} MapRef={mapRef.current} />
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
