import { Map } from "maplibre-gl";
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
type ClusterCreateData = {
  DataSource: RequireOnlyOne<
    { url?: string; id: string; data?: string },
    "data" | "url"
  >;
  Cluster: {
    id: string;
    color: string;
    //paint: CircleLayerSpecification["paint"];
  };
  ClusterCount: {
    id: string;
    //layout: SymbolLayerSpecification["layout"];
  };
  Uncluster: {
    id: string;
    color: string;
    //paint: CircleLayerSpecification["paint"];
  };
};

function AddClusterPoints(map: Map, data: ClusterCreateData) {
  map.addSource(data.DataSource.id, {
    type: "geojson",
    data: data.DataSource.url || data.DataSource.data,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });
  map.addLayer({
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

  map.addLayer({
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
  map.addLayer({
    id: data.Uncluster.id,
    type: "circle",
    source: "ads_data",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": data.Uncluster.color,
      "circle-radius": 8,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
}

export { AddClusterPoints };
export type { ClusterCreateData };
