import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/slices/flightSlice";

const MapView = ({ openModal }) => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.flightSlice);

  const customIcon = new L.Icon({
    iconUrl: "/plane.png",
    iconSize: [32, 32],
  });

  return (
    <MapContainer
      center={[39.149702, 35.420686]}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {state.flights.map((i, index) => (
        <Marker key={index} position={[i.lat, i.lng]} icon={customIcon}>
          <Popup>
            <div className="popup">
              <span>Code: {i.code}</span>
              <button onClick={() => openModal(i.id)}>Detail</button>
              {state.trail.length > 0 && (
                <button onClick={() => dispatch(clear())}>
                  Rotayı Temizle
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={state.trail} />
    </MapContainer>
  );
};

export default MapView;
