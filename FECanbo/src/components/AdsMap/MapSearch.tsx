import { useEffect, useRef, useState } from "react";

import { Button, Select } from "antd";
import MapLibreGL, { Map, Marker, Popup } from "maplibre-gl";
import {
  GoongPredictRespond,
  GoongRevGeocodeRespond,
  useLazyGetPlaceDetail,
  useLazyGetPredicts,
  useLazyRevGeocode,
} from "../../slices/GoongApi";

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

export type MapSearchProps = {
  MapRef?: Map | null;
  refresh: number;
  initPos: { lng: number; lat: number };
  onMapDblClick?: (data: { lng: number; lat: number }) => void;
  onPlaceSelect: (place: PlacePropertyCreate) => void;
};

function MapSearchBar(props: MapSearchProps) {
  const [placeOpts, setPlaceOpts] = useState<PlaceOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean | undefined>(undefined);

  const [mapClick, setMapClick] = useState<{ lng: number; lat: number }>();

  const [getPlaceDetail, predictions] = useLazyGetPlaceDetail();
  const [getPredicts] = useLazyGetPredicts();
  const [getRevGeocode, revGeoLocations] = useLazyRevGeocode();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const markerPopup = useRef<Popup | null>(null);
  const MarkerRef = useRef<Marker | null>(null);
  const currPlace = useRef<PlacePropertyCreate | null>(null);
  //console.log(predictions.data);

  function initialize_marker() {
    console.log(props.refresh);
    if (MarkerRef.current || !props.MapRef) return;
    if (props.refresh < 2) return;

    console.log("Init markers", props.initPos);

    markerPopup.current = new MapLibreGL.Popup({
      offset: 37,
      anchor: "bottom",
    }).setText("Select a location");

    MarkerRef.current = new MapLibreGL.Marker({ draggable: true }).setLngLat({
      ...props.initPos,
    });

    MarkerRef.current.on("dragend", function () {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!MarkerRef.current) return;
      const { lng, lat } = MarkerRef.current.getLngLat();
      // if (markerPopup.current && props.MapRef)
      //   markerPopup.current.setLngLat({ lng, lat }).addTo(props.MapRef);
      timeoutRef.current = setTimeout(function () {
        props.onMapDblClick?.({ lng, lat });
        setMapClick({ lng, lat });
      }, 2000);
    });

    MarkerRef.current.on("dragstart", function () {
      //markerPopup.current?.remove();
    });

    MarkerRef.current.addTo(props.MapRef);
    setMapClick(props.initPos);
  }

  function on_map_dbClick() {
    if (!mapClick) return;
    const { lng, lat } = mapClick;
    MarkerRef.current?.setLngLat([lng, lat]);
    props.MapRef?.jumpTo({ center: [lng, lat] });
    getRevGeocode({ key: GoongKey, lng, lat }).then((respond) => {
      get_suggest_option({ type: "RevGeo", respond: respond.data });
    });
    console.log(mapClick);
  }

  useEffect(initialize_marker, [props.refresh]);

  useEffect(on_map_dbClick, [mapClick]);

  useEffect(() => {
    if (!MarkerRef.current || !props.MapRef) return;
    if (props.refresh < 2) return;
    MarkerRef.current.setLngLat(props.initPos);
  }, [props.initPos]);

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

  function set_select_place(placeData: PlacePropertyCreate) {
    if (props.MapRef) {
      markerPopup.current
        ?.setText(placeData.formatted_address)
        .setLngLat({
          lng: placeData.lng,
          lat: placeData.lat,
        })
        .addTo(props.MapRef);
      currPlace.current = placeData;
    }
  }

  function selectPlace() {
    if (currPlace.current) props.onPlaceSelect(currPlace.current);
  }

  function fly_to_maker() {
    if (!MarkerRef.current || !props.MapRef) return;
    props.MapRef.jumpTo({
      center: MarkerRef.current.getLngLat(),
    });
  }

  return (
    <div className=" flex w-1/2 flex-row gap-x-2">
      <Select
        onFocus={() => setOpenSelect(true)}
        onBlur={() => setOpenSelect(undefined)}
        open={openSelect}
        loading={loading}
        showSearch
        placeholder={"Search for location"}
        options={placeOpts}
        onSearch={on_search_location}
        onSelect={on_suggest_select}
        allowClear
        className=" flex-1"
      />
      <Button onClick={fly_to_maker}>📌</Button>
      <Button type="primary" onClick={selectPlace}>
        Chọn địa điểm
      </Button>
    </div>
  );
}
export default MapSearchBar;
