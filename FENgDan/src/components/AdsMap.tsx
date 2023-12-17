import MapLibreGL, { Map, Marker, Popup } from "maplibre-gl";
import { useEffect, useReducer, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { z } from "zod";
import { Switch } from "antd";
import { AddClusterPoints } from "../utils/AddClusterPoint";
import { AdsMarkerInfoSchema } from "../models/mock_markers";
import { useAppDispatch } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import MapSearchBar from "./AdsMap/MapSearch";
import { setDblClick } from "../Redux/MapClickSlice";

const ADS_INFO = {
  DataSourceId: "ads_data",
  ClusterId: "ads_cluster",
  ClusterCountId: "ads_cluster_count",
  UnclusterId: "ads_unclustered_point",
  SearchMarker: "search_select_marker",
} as const;

const InitalMapData = {
  lng: 106.69379445290143,
  lat: 10.788266281491206,
  zoom: 14,
};

function AdsMap() {
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
    const geo_json_url =
      //(import.meta as any).env.VITE_GEOJSON_URL ||
      "http://localhost:5173/MockMarker.json";
    console.log("Geo json url", geo_json_url);

    AddClusterPoints(map, {
      DataSource: {
        id: ADS_INFO.DataSourceId,
        url: geo_json_url,
      },
      Cluster: {
        id: ADS_INFO.ClusterId,
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      },
      ClusterCount: {
        id: ADS_INFO.ClusterCountId,
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      },
      Uncluster: {
        id: ADS_INFO.UnclusterId,
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      },
    });

    map.on("click", "ads_unclustered_point", function (e) {
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

    map.on("mouseenter", "ads_unclustered_point", function (e) {
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
    map.on("mouseleave", "ads_unclustered_point", function () {
      popUpRef.current?.remove();
    });
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
      zoom: InitalMapData.zoom,
      center: [InitalMapData.lng, InitalMapData.lat],
      doubleClickZoom: false,
    });
    // map.on("move", () => {
    //   if (!mapRef.current) return;
    //   // const [lng, lat, zoom] = [
    //   //   Number(mapRef.current.getCenter().lng.toFixed(4)),
    //   //   Number(mapRef.current.getCenter().lat.toFixed(4)),
    //   //   Number(mapRef.current.getZoom().toFixed(2)),
    //   // ];
    //   //if (!!lng && !Number.isNaN(lng)) setLng(lng);
    //   //if (!!lat && !Number.isNaN(lat)) setLat(lat);
    //   //if (!!zoom && !Number.isNaN(zoom)) setZoom(zoom);
    // });

    map.once("load", function () {
      initialize_ads_markers(map);
      initialize_map_control(map);

      map.on("dblclick", function (e) {
        dispatch(setDblClick({ lng: e.lngLat.lng, lat: e.lngLat.lat }));
      });
    });

    mapRef.current = map;

    //mock_coord.forEach((m) => create_marker(m));
  }

  function show_ads_check_handler(is_check: boolean) {
    if (!mapRef.current) return;
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      ADS_INFO.UnclusterId,
      "visibility",
      visible,
    );
    mapRef.current.setLayoutProperty(
      ADS_INFO.ClusterCountId,
      "visibility",
      visible,
    );
    mapRef.current.setLayoutProperty(ADS_INFO.ClusterId, "visibility", visible);

    setAdsVisible(is_check);
  }

  useEffect(function () {
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
    dispatch(setDblClick({ ...InitalMapData }));
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
