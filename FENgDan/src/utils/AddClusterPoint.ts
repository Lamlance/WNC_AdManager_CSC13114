import {
  CircleLayerSpecification,
  Map,
  SymbolLayerSpecification,
} from "maplibre-gl";

type ClusterCreateData = {
  DataSource: {
    url: string;
    id: string;
  };
  Cluster: {
    id: string;
    paint: CircleLayerSpecification["paint"];
  };
  ClusterCount: {
    id: string;
    layout: SymbolLayerSpecification["layout"];
  };
  Uncluster: {
    id: string;
    paint: CircleLayerSpecification["paint"];
  };
};

function AddClusterPoints(map: Map, data: ClusterCreateData) {
  map.addSource(data.DataSource.id, {
    type: "geojson",
    data: data.DataSource.url,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });
  map.addLayer({
    id: data.Cluster.id,
    type: "circle",
    source: data.DataSource.id,
    filter: ["has", "point_count"],
    paint: data.Cluster.paint,
  });
  map.addLayer({
    id: data.ClusterCount.id,
    type: "symbol",
    source: data.DataSource.id,
    filter: ["has", "point_count"],
    layout: data.ClusterCount.layout,
  });
  map.addLayer({
    id: data.Uncluster.id,
    type: "circle",
    source: "ads_data",
    filter: ["!", ["has", "point_count"]],
    paint: data.Uncluster.paint,
  });
}

export { AddClusterPoints };
