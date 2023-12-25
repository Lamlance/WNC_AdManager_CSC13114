import { Drawer, Modal } from "antd";
import { AdsMap } from "@admanager/frontend";
import MapSearchBar, { MapSearchProps } from "./MapSearch";
import "maplibre-gl/dist/maplibre-gl.css";

const DefaultMapProps = {
  InitialPosition: {
    lng: 106.69379445290143,
    lat: 10.788266281491206,
    zoom: 14,
  },
};

interface AdsMapModalProps {
  open: boolean;
  onClose: () => void;
  initPos: { lng: number; lat: number };
  onPlaceSelect?: MapSearchProps["onPlaceSelect"];
}
function AdsMapModal({
  open = false,
  onClose,
  initPos,
  onPlaceSelect,
}: AdsMapModalProps) {
  const onMapClick = function (lngLat: { lng: number; lat: number }) {
    console.log(lngLat);
  };

  const onPlace: MapSearchProps["onPlaceSelect"] = function (data) {
    onPlaceSelect?.(data);
    onClose();
  };

  return (
    <Drawer width={"100vw"} open={open} onClose={onClose}>
      <div className=" relative h-full w-full">
        <AdsMap<MapSearchProps>
          SearchBar={{
            func: MapSearchBar,
            args: [{ refresh: 0, onPlaceSelect: onPlace, initPos: initPos }],
          }}
          InitialPosition={DefaultMapProps.InitialPosition}
          onMapDblClick={onMapClick}
        />
      </div>
    </Drawer>
  );
}

export default AdsMapModal;
