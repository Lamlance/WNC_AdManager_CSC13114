import { useEffect, useRef, useState } from "react";
import {
  useLazyGetPlaceDetail,
  useLazyGetPredicts,
  useLazyRevGeocode,
} from "../../Redux/GoongApi";
import { z } from "zod";
import { Select } from "antd";
import { useAppSelector } from "../../Redux/ReduxStore";
import { Marker } from "maplibre-gl";

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
  MarkerRef?: Marker;
};

function MapSearchBar(props: MapSearchRef) {
  const [placeOpts, setPlaceOpts] = useState<PlaceOption[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean | undefined>(undefined);

  const mapClick = useAppSelector((state) => state.MapClick);

  const [getPlaceDetail, placeDetail] = useLazyGetPlaceDetail();
  const [getPredicts, predictResult] = useLazyGetPredicts();
  const [getRevGeocode] = useLazyRevGeocode();
  useEffect(
    function () {
      if (!mapClick) return;
      const { lng, lat } = mapClick.dblClick;
      getRevGeocode({ key: GoongKey, lng, lat }).then((respond) => {
        get_suggest_option({ type: "RevGeo", respond });
      });
      console.log(mapClick?.dblClick);
    },
    [mapClick],
  );

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
      const result = await getPlaceDetail({
        key: GoongKey,
        place_id: key,
      });
      if (!result.data) return;
      const { lng, lat } = result.data.result.geometry.location;
      console.log(lng, lat);
      props.MarkerRef?.setLngLat([lng, lat]);
      return;
    }

    try {
      const { lng, lat } = z
        .object({ lng: z.number(), lat: z.number() })
        .parse(JSON.parse(z.string().parse(key.split(IdCoordDelimiter)[1])));
      console.log(lng, lat);
      props.MarkerRef?.setLngLat([lng, lat]);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <Select
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
