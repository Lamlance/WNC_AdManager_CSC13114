import MapLibreGL, { Map, Popup } from "maplibre-gl";
import { useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "../../../../FENgDan/src/components/AdsMap.css";
import "maplibre-gl/dist/maplibre-gl.css";
import usecontext from "../UseReducer/usecontext.js"


function AdsMap() {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  // const dispatch = useAppDispatch();
  const  navigate  = useNavigate()

  const { state, dispath } = useContext(usecontext)
  const { lng, lat } = state;


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

        dispath({ type: "SET_LNG", payload: lng })
        dispath({ type: "SET_LAT", payload: lng })
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
