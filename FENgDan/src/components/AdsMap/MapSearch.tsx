import { useEffect, useRef, useState } from "react";
import {
  useLazyGetPlaceDetail,
  useLazyGetPredicts,
  useLazyRevGeocode,
} from "../../Redux/GoongApi";
import { z } from "zod";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../Redux/ReduxStore";
import MapLibreGL, { Map, Marker, Popup } from "maplibre-gl";
import { setDblClick } from "../../Redux/MapClickSlice";

type PlaceOption = {
  value: string;
  key: string;
  disabled?: boolean;
};
type PlaceOptionMapArgs =
  | {
      type: "Predict";
      respond: Awaited<ReturnType<ReturnType<typeof useLazyGetPredicts>[0]>>;
    }
  | {
      type: "RevGeo";
      respond: Awaited<ReturnType<ReturnType<typeof useLazyRevGeocode>[0]>>;
    };
const GoongKey = "4xsMpUsUm57ogvFDPCjlQlvmUWq6JqzeYOYJfjJe";
const IdCoordDelimiter = "|^|";

type MapSearchRef = {
  MapRef?: Map | null;
  refresh: boolean;
};

function MapSearchBar(props: MapSearchRef) {
  const [placeOpts, setPlaceOpts] = useState<PlaceOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean | undefined>(undefined);

  const mapClick = useAppSelector((state) => state.MapClick);
  const dispatch = useAppDispatch();

  const [getPlaceDetail, predictions] = useLazyGetPlaceDetail();
  const [getPredicts] = useLazyGetPredicts();
  const [getRevGeocode] = useLazyRevGeocode();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const markerPopup = useRef<Popup | null>(null);
  const MarkerRef = useRef<Marker | null>(null);

  console.log(predictions.data);

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
    console.log(props.MapRef?.querySourceFeatures("ads_data"));

    getRevGeocode({ key: GoongKey, lng, lat }).then((respond) => {
      get_suggest_option({ type: "RevGeo", respond });
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
        get_suggest_option({ type: "Predict", respond: p }),
      );
    }, 2000);
  }

  function get_suggest_option({ type, respond }: PlaceOptionMapArgs) {
    setLoading(false);
    if (!respond.data) return setPlaceOpts([]);

    if (type === "Predict") {
      return setPlaceOpts(
        respond.data.predictions.map((p) => ({
          value: p.description,
          key: p.place_id,
        })),
      );
    }

    setOpenSelect(true);
    setPlaceOpts(
      respond.data.results.map((r) => ({
        value: r.formatted_address,
        key: `${r.place_id}${IdCoordDelimiter}${JSON.stringify(
          r.geometry.location,
        )}`,
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
      return;
    }

    try {
      const { lng, lat } = z
        .object({ lng: z.number(), lat: z.number() })
        .parse(JSON.parse(z.string().parse(key.split(IdCoordDelimiter)[1])));
      console.log(lng, lat);
      MarkerRef.current?.setLngLat([lng, lat]);
    } catch (e) {
      console.warn(e);
    }
  }

  function on_select_focus() {
    if (typeof openSelect === "boolean") return setOpenSelect(undefined);
  }

  return (
    <Select
      onFocus={on_select_focus}
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
