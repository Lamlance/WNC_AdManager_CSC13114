import MapLibreGL, { Map, Popup } from "maplibre-gl";
import { useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "../../../../FENgDan/src/components/AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";

import { useDispatch, useSelector } from 'react-redux';
import { onChangeName, onChangeAddress, setLng, setLat, showModalClose, showModalOpen } from '../../slices/locationSlice.tsx';
import type { RootState } from '../../store.ts'


function AdsMap() {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  // const dispatch = useAppDispatch();
  const  navigate  = useNavigate()

  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);


  const { lng, lat } = location;

  function initialize_map(container: HTMLElement) {
    if (mapRef.current) {
      return;
    }
    const token = (import.meta as any).env.VITE_LOCATION_IQ_KEY;
    if (!token) {
      return;
    }
    var map = new MapLibreGL.Map({
      container: container,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${token}`,
      center: [lng, lat],
      zoom: 14
    });
    map.on('style.load', function () {
      map.on('click', function (e) {
        var coordinates = e.lngLat;
        new MapLibreGL.Popup()
          .setLngLat(coordinates)
          .setHTML('you clicked here: <br/>' + coordinates)
          .addTo(map);
        const { lng, lat } = e.lngLat;

        dispatch(setLng(lng));
        dispatch(setLat(lat));
        setTimeout(() => { navigate('/vhtt/editpoint')}, 200);
      });
    });

    mapRef.current = map;

    //mock_coord.forEach((m) => create_marker(m));
  }

  useEffect(function () {
    console.log("da den day")
    if (!mapEleRef.current) return;
    initialize_map(mapEleRef.current);
  }, []);

  return (
    <div className=" relative h-full w-full">
      <div id="locationIQ_map" ref={mapEleRef} className=" h-full w-full"></div>
      {/* <Link to={{ pathname: '/setpoint', state: { lng, lat } }}>
        Go to SetPoint
      </Link> */}
    </div>
  );
}

export default AdsMap;
