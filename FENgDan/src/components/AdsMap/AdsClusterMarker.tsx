import MapLibreGL, { GeoJSONSource, Map, Popup } from "maplibre-gl";
import {
  AddClusterPoints,
  ClusterCreateData,
} from "../../utils/AddClusterPoint";
import { useEffect, useRef } from "react";
import { ZodType, infer as ZodInfer } from "zod";

interface AdsClusterMarkerProps<S extends ZodType> {
  markerData: ClusterCreateData;
  readonly mapRef: React.MutableRefObject<Map | null>;
  geoJsonPropertySchema: S;
  onMarkerClick?: (data: ZodInfer<S>) => void;
  popUpBuilder?: (data: ZodInfer<S>, lngLat: [number, number]) => Popup;
}

function AdsClusterMarker<S extends ZodType>({
  geoJsonPropertySchema,
  mapRef,
  markerData,
  onMarkerClick,
  popUpBuilder,
}: AdsClusterMarkerProps<S>) {
  const hadInitMarker = useRef<boolean>(false);
  const popUpRef = useRef<Popup | null>(null);

  function create_markers() {
    if (!mapRef.current) return;

    const source = mapRef.current.getSource(markerData.DataSource.id) as
      | GeoJSONSource
      | undefined;
    console.log(source, markerData.DataSource.id);
    if (!source) AddClusterPoints(mapRef.current, markerData);
    else if (source.type === "geojson" && markerData.DataSource.data)
      source.setData(markerData.DataSource.data);

    if (hadInitMarker.current) return;
    hadInitMarker.current = true;

    mapRef.current.on("click", markerData.Uncluster.id, function (e) {
      const points = e.features?.[0].geometry;
      if (!points) return;
      const marker_data = geoJsonPropertySchema.safeParse(
        e.features?.[0].properties,
      );

      if (marker_data.success === true) onMarkerClick?.(marker_data.data);
    });

    mapRef.current.on("mouseenter", markerData.Uncluster.id, function (e) {
      if (!popUpBuilder) return;

      const points = e.features?.[0].geometry;
      if (!points || !mapRef.current) return;
      mapRef.current.getCanvas().style.cursor = "pointer";

      const [lng, lat] = (points as GeoJSON.Point).coordinates.slice();
      const marker_data = geoJsonPropertySchema.safeParse(
        e.features?.[0].properties,
      );
      if (marker_data.success === false) return;
      popUpRef.current = popUpBuilder(marker_data.data, [lng, lat]);
      popUpRef.current.addTo(mapRef.current);
    });

    mapRef.current.on("mouseleave", markerData.Uncluster.id, function () {
      popUpRef.current?.remove();
    });
  }

  useEffect(create_markers, [markerData]);

  return <></>;
}

export default AdsClusterMarker;
