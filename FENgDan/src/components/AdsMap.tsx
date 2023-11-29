import MapLibreGL, { Map, Popup } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { AdsMarkerInfoSchema } from "../data/mock_markers";
import { z } from "zod";
import { Switch } from "antd";

function AdsMap() {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [lng, setLng] = useState(106.69379445290143);
  const [lat, setLat] = useState(10.788266281491206);
  const [zoom, setZoom] = useState(14);

  const [adsVisible, setAdsVisible] = useState<boolean>(true);

  function initialize_ads_markers(map: Map) {
    let popup: Popup | null = null;

    function make_info_maker(
      data: z.infer<typeof AdsMarkerInfoSchema>,
      coord: [number, number],
    ) {
      popup = new MapLibreGL.Popup()
        .setLngLat(coord)
        .setMaxWidth("500px")
        .setHTML(
          `<div class="text-lg">
          <h1 class="font-bold">${data.ad_type}</h1>
          <p>${data.land_type}</p>
          <p>${data.ad_type}</p>
          <p>${data.address}</p>
          <h4 class="font-bold italic">${
            data.legal ? "Đã quy hoạch" : "Chưa quy hoạch"
          }</h4>
        </div>`,
        )
        .addTo(map);
    }

    map.addSource("ads_data", {
      type: "geojson",
      data: "http://localhost:5173/MockMarker.json",
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    map.addLayer({
      id: "ads_cluster",
      type: "circle",
      source: "ads_data",
      filter: ["has", "point_count"],
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
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });
    map.addLayer({
      id: "ads_cluster_count",
      type: "symbol",
      source: "ads_data",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });
    map.addLayer({
      id: "ads_unclustered_point",
      type: "circle",
      source: "ads_data",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    map.on("click", "ads_unclustered_point", function (e) {
      const points = e.features?.[0].geometry;
      if (!points) return;

      const [lng, lat, hi] = (points as GeoJSON.Point).coordinates.slice();
      const marker_data = AdsMarkerInfoSchema.safeParse(
        e.features?.[0].properties,
      );

      if (marker_data.success == false) return;
      //make_info_maker(marker_data.data, [lng, lat]);
    });

    map.on("mouseenter", "ads_unclustered_point", function (e) {
      const points = e.features?.[0].geometry;
      if (!points) return;
      map.getCanvas().style.cursor = "pointer";

      const [lng, lat, hi] = (points as GeoJSON.Point).coordinates.slice();
      const marker_data = AdsMarkerInfoSchema.safeParse(
        e.features?.[0].properties,
      );

      if (marker_data.success == false) return;
      make_info_maker(marker_data.data, [lng, lat]);
    });
    map.on("mouseleave", "ads_unclustered_point", function () {
      popup?.remove();
    });

    map.on("mouseenter", "ads_cluster", function () {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "ads_cluster", function () {
      map.getCanvas().style.cursor = "";
    });
  }

  function initialize_map(container: HTMLElement) {
    if (!!mapRef.current) return;
    const token = (import.meta as any).env?.VITE_LOCATION_IQ_KEY;
    if (!token) return;

    const url = `https://tiles.locationiq.com/v3/streets/vector.json?key=${token}`;

    const map = new MapLibreGL.Map({
      container: container,
      style: url,
      zoom: zoom,
      center: [lng, lat],
    });

    map.on("move", () => {
      if (!mapRef.current) return;
      const [lng, lat, zoom] = [
        Number(mapRef.current.getCenter().lng.toFixed(4)),
        Number(mapRef.current.getCenter().lat.toFixed(4)),
        Number(mapRef.current.getZoom().toFixed(2)),
      ];
      if (!!lng && !Number.isNaN(lng)) setLng(lng);
      if (!!lat && !Number.isNaN(lat)) setLat(lat);
      if (!!zoom && !Number.isNaN(zoom)) setZoom(zoom);
    });

    map.once("load", function () {
      initialize_ads_markers(map);
    });

    mapRef.current = map;

    //mock_coord.forEach((m) => create_marker(m));
  }

  function show_ads_check_handler(is_check: boolean) {
    if (!mapRef.current) return;
    const visible = is_check ? "visible" : "none";
    mapRef.current.setLayoutProperty(
      "ads_unclustered_point",
      "visibility",
      visible,
    );
    mapRef.current.setLayoutProperty("ads_cluster", "visibility", visible);
    setAdsVisible(is_check);
  }

  useEffect(function () {
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
  }, []);

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
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
