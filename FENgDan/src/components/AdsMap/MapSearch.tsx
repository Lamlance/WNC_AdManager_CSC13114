import { useEffect, useRef, useState } from "react";
import {
  GoongPredictRespond,
  GoongRevGeocodeRespond,
  useLazyGetPlaceDetail,
  useLazyGetPredicts,
  useLazyRevGeocode,
} from "../../Redux/GoongApi";
import { z } from "zod";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../Redux/ReduxStore";
import MapLibreGL, { Map, Marker, Popup } from "maplibre-gl";
import { setDblClick } from "../../Redux/MapClickSlice";
import { AdsGeoJson } from "@admanager/shared";
import { setSelectedAdsLocation } from "../../Redux/SelectedAdsSlice";

type PlaceOption = {
  value: string;
  key: string;
  disabled?: boolean;
};

type PlaceOptionMapArgs =
  | {
      type: "Predict";
      respond: GoongPredictRespond | undefined;
    }
  | {
      type: "RevGeo";
      respond: GoongRevGeocodeRespond | undefined;
    };

type PlacePropertyCreate = {
  lng: number;
  lat: number;
  formatted_address: string;
};

const GoongKey = "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe";
const IdCoordDelimiter = "|^|";

type MapSearchProps = {
  MapRef?: Map | null;
  refresh: number;
};

function MapSearchBar(props: MapSearchProps) {
  const [placeOpts, setPlaceOpts] = useState<PlaceOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean | undefined>(undefined);

  const mapClick = useAppSelector((state) => state.MapClick);
  const dispatch = useAppDispatch();

  const [getPlaceDetail, predictions] = useLazyGetPlaceDetail();
  const [getPredicts] = useLazyGetPredicts();
  const [getRevGeocode, revGeoLocations] = useLazyRevGeocode();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const markerPopup = useRef<Popup | null>(null);
  const MarkerRef = useRef<Marker | null>(null);

  //console.log(predictions.data);

  function initialize_marker() {
    if (MarkerRef.current || !props.MapRef) return;
    if (!mapClick) return;

    markerPopup.current = new MapLibreGL.Popup({
      offset: 37,
      anchor: "bottom",
    }).setText("Marker Pop up");

    MarkerRef.current = new MapLibreGL.Marker({ draggable: true }).setLngLat({
      ...mapClick.dblClick,
    });

    MarkerRef.current.on("dragend", function () {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!MarkerRef.current) return;
      const { lng, lat } = MarkerRef.current.getLngLat();
      // if (markerPopup.current && props.MapRef)
      //   markerPopup.current.setLngLat({ lng, lat }).addTo(props.MapRef);
      timeoutRef.current = setTimeout(function () {
        dispatch(setDblClick({ lng, lat }));
      }, 2000);
    });

    MarkerRef.current.on("dragstart", function () {
      //markerPopup.current?.remove();
    });

    MarkerRef.current.addTo(props.MapRef);
  }

  function on_map_dbClick() {
    if (!mapClick) return;
    const { lng, lat } = mapClick.dblClick;
    MarkerRef.current?.setLngLat([lng, lat]);

    getRevGeocode({ key: GoongKey, lng, lat }).then((respond) => {
      get_suggest_option({ type: "RevGeo", respond: respond.data });
    });
    console.log(mapClick?.dblClick);
  }

  useEffect(initialize_marker, [props.refresh]);

  useEffect(on_map_dbClick, [mapClick]);

  function on_search_location(srch: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (loading == false) setLoading(true);
    if (typeof openSelect === "boolean") setOpenSelect(undefined);

    if (!srch || srch.split(" ").length < 2) return;
    timeoutRef.current = setTimeout(function () {
      console.log("Now searching: ", srch);
      getPredicts({ key: GoongKey, input: srch }).then((p) =>
        get_suggest_option({ type: "Predict", respond: p.data }),
      );
    }, 2000);
  }

  function get_suggest_option({ type, respond }: PlaceOptionMapArgs) {
    setLoading(false);
    if (!respond) return setPlaceOpts([]);

    if (type === "Predict") {
      return setPlaceOpts(
        respond.predictions.map((p) => ({
          value: p.description,
          key: p.place_id,
        })),
      );
    }

    setOpenSelect(true);
    setPlaceOpts(
      respond.results.map((r) => ({
        value: r.formatted_address,
        key: `${r.place_id}${IdCoordDelimiter}`,
      })),
    );
  }

  async function on_suggest_select(_: string, { key }: { key: string }) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenSelect(undefined);

    if (key.includes(IdCoordDelimiter) == false) {
      const result = await getPlaceDetail({ key: GoongKey, place_id: key });
      if (!result.data) return;
      const { lng, lat } = result.data.result.geometry.location;
      console.log(lng, lat);
      MarkerRef.current?.setLngLat([lng, lat]);

      set_select_place({ ...result.data.result, lng, lat });
      return;
    }

    if (!revGeoLocations.data) return;
    const place_id = key.replace(IdCoordDelimiter, "");
    const place = revGeoLocations.data.results.find(
      (v) => v.place_id === place_id,
    );
    if (!place) return;
    MarkerRef.current?.setLngLat(place.geometry.location);
    set_select_place({ ...place, ...place.geometry.location });
  }

  function set_select_place({
    lng,
    lat,
    formatted_address,
  }: PlacePropertyCreate) {
    console.log("Set palce", formatted_address);
    dispatch(
      setSelectedAdsLocation({
        ads: [],
        place: {
          lng,
          lat,
          dia_chi: formatted_address,
          ten_dia_diem: formatted_address,
          id_dia_diem: -1,
        },
      }),
    );
  }

  return (
    <Select
      onFocus={() => setOpenSelect(true)}
      onBlur={() => setOpenSelect(undefined)}
      open={openSelect}
      loading={loading}
      showSearch
      placeholder={"Search for location"}
      options={placeOpts}
      onSearch={on_search_location}
      className=" w-1/2"
      onSelect={on_suggest_select}
      allowClear
    />
  );
}
export default MapSearchBar;
