import MapLibreGL, { Map, Marker, Popup } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "./AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { z } from "zod";
import { AutoComplete, Switch } from "antd";
import { AddClusterPoints } from "../utils/AddClusterPoint";
import { AdsMarkerInfoSchema } from "../models/mock_markers";
import { useAppDispatch } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import { useLazyGetPlaceDetail, useLazyGetPredicts } from "../Redux/GoongApi";
import { OptionProps } from "antd/es/select";

const ADS_INFO = {
  DataSourceId: "ads_data",
  ClusterId: "ads_cluster",
  ClusterCountId: "ads_cluster_count",
  UnclusterId: "ads_unclustered_point",
  SearchMarker: "search_select_marker",
} as const;

function AdsMap() {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const dispatch = useAppDispatch();

  const [lng, setLng] = useState(106.69379445290143);
  const [lat, setLat] = useState(10.788266281491206);
  const [zoom, setZoom] = useState(14);

  const [adsVisible, setAdsVisible] = useState<boolean>(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const selectMarkerRef = useRef<Marker>(new MapLibreGL.Marker());

  const [getPredicts, predictResult] = useLazyGetPredicts();
  const [getPlaceDetail, placeDetail] = useLazyGetPlaceDetail();

  function initialize_ads_markers(map: Map) {
    let popup: Popup | null = null;

    function make_info_maker(
      data: z.infer<typeof AdsMarkerInfoSchema>,
      coord: [number, number],
    ) {
      if (data.ads.length <= 0) return;
      popup = new MapLibreGL.Popup()
        .setLngLat(coord)
        .setMaxWidth("500px")
        .setHTML(
          `<div class="text-lg">
          <h1 class="font-bold">${data.ads[0].ad_type}</h1>
          <p>${data.ads[0].land_type}</p>
          <p>${data.ads[0].ad_type}</p>
          <p>${data.ads[0].address}</p>
          <h4 class="font-bold italic">${
            data.ads[0].legal ? "Đã quy hoạch" : "Chưa quy hoạch"
          }</h4>
        </div>`,
        )
        .addTo(map);
    }

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
      make_info_maker(marker_data.data, [lng, lat]);

      console.log("You click a mark", marker_data.data.ads[0].name);
      dispatch(setSelectedAdsLocation(marker_data.data));
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
  }

  function initialize_map(container: HTMLElement) {
    if (mapRef.current) return;
    const token = (import.meta as any).env.VITE_LOCATION_IQ_KEY;
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
      selectMarkerRef.current.setLngLat([lng, lat]).addTo(map);
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

  console.log(predictResult);

  function on_search_location(srch: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!srch) return;
    timeoutRef.current = setTimeout(function () {
      console.log("Now searching: ", srch);
      getPredicts({
        key: "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe",
        input: srch,
      });
    }, 2000);
  }

  useEffect(function () {
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
  }, []);

  function get_suggest_option() {
    if (!predictResult.currentData || !predictResult.currentData.predictions)
      return [];
    return predictResult.currentData.predictions.map((p) => ({
      value: p.description,
      key: p.place_id,
    }));
  }

  async function on_suggest_select(desc: string, { key }: { key: string }) {
    const result = await getPlaceDetail({
      key: "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe",
      place_id: key,
    });
    if (!result.data) return;
    const { lng, lat } = result.data.result.geometry.location;
    selectMarkerRef.current.setLngLat([lng, lat]);
  }

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
      <div className=" absolute left-4 right-4 top-4">
        <AutoComplete
          placeholder={"Search for location"}
          options={get_suggest_option()}
          onChange={on_search_location}
          className=" w-1/2"
          onSelect={on_suggest_select}
          allowClear
        />
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
