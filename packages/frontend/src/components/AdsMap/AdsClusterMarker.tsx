import MapLibreGL, { GeoJSONSource, Map, Popup } from "maplibre-gl";
import { ClusterCreateData } from "../../utils/AddClusterPoint";
import { useEffect, useRef } from "react";
import { ZodType, infer as ZodInfer } from "zod";
interface AdsClusterMarkerProps<S extends ZodType> {
  markerData: ClusterCreateData;
  readonly mapRef?: Map | null;
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

  function AddClusterPoints(data: ClusterCreateData) {
    if (!mapRef) return;
    if (mapRef.getSource(data.DataSource.id)) {
      return;
    }

    mapRef.addSource(data.DataSource.id, {
      type: "geojson",
      data: data.DataSource.data,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    mapRef.addLayer({
      id: data.Cluster.id,
      type: "circle",
      source: data.DataSource.id,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          data.Cluster.color,
          100,
          data.Cluster.color,
          750,
          data.Cluster.color,
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    mapRef.addLayer({
      id: data.ClusterCount.id,
      type: "symbol",
      source: data.DataSource.id,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });
    mapRef.addLayer({
      id: data.Uncluster.id,
      type: "circle",
      source: data.DataSource.id,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": data.Uncluster.color,
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    mapRef.redraw();
  }

  function create_markers() {
    if (!mapRef) return;

    const source = mapRef.getSource(markerData.DataSource.id) as
      | GeoJSONSource
      | undefined;
    console.log(source, markerData.DataSource.id);
    if (!source) AddClusterPoints(markerData);
    else if (source.type === "geojson" && markerData.DataSource.data)
      source.setData(markerData.DataSource.data);

    if (hadInitMarker.current) return;
    hadInitMarker.current = true;

    mapRef.on("click", markerData.Uncluster.id, function (e) {
      e.originalEvent.stopPropagation();
      const points = e.features?.[0].geometry;
      if (!points) return;
      const marker_data = geoJsonPropertySchema.safeParse(
        e.features?.[0].properties[0]
          ? Object.values(e.features?.[0].properties)
          : e.features?.[0].properties
      );

      if (marker_data.success === true) onMarkerClick?.(marker_data.data);
    });

    mapRef.on("mouseenter", markerData.Uncluster.id, function (e) {
      e.originalEvent.stopPropagation();

      if (!popUpBuilder) return;

      const points = e.features?.[0].geometry;
      if (!points || !mapRef) return;
      mapRef.getCanvas().style.cursor = "pointer";

      const [lng, lat] = (points as GeoJSON.Point).coordinates.slice();

      const marker_data = geoJsonPropertySchema.safeParse(
        e.features?.[0].properties[0]
          ? Object.values(e.features?.[0].properties)
          : e.features?.[0].properties
      );

      if (marker_data.success === false) return console.log(marker_data.error);
      popUpRef.current = popUpBuilder(marker_data.data, [lng, lat]);
      popUpRef.current.addTo(mapRef);
    });

    mapRef.on("mouseleave", markerData.Uncluster.id, function (e) {
      e.originalEvent.stopPropagation();
      popUpRef.current?.remove();
    });
  }

  useEffect(create_markers, [markerData]);

  return <></>;
}

export default AdsClusterMarker;
