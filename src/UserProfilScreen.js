import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faPhone,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import "leaflet/dist/leaflet.css";
import "./App.css";

function UserProfilScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const icon = L.icon({
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
  });

  useEffect(() => {
    if (location.state == null) {
      navigate("/");
    }
  });

  if (location.state) {
    const projectName = location.state.user;
    const lat = projectName.location.coordinates.latitude;
    const long = projectName.location.coordinates.longitude;
    console.log(lat, long);

    return (
      <div className="contener_body">
        <div className="User_Card">
          <div className="center">
            <img
              alt={projectName.name.last}
              src={projectName.picture.large}
              className="img"
            />
            <h2>
              {projectName.name.title} {projectName.name.first}
              {projectName.name.last}
            </h2>
          </div>
          <p>
            <FontAwesomeIcon icon={faCakeCandles} className="icon" />
            {projectName.dob.date.slice(0, 10)} ({projectName.dob.age} years)
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="icon" />{" "}
            {projectName.email}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="icon" />{" "}
            {projectName.phone}
          </p>
        </div>

        <div className="contener_map">
          <MapContainer
            center={[lat, long]}
            zoom={4}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]} icon={icon} />
          </MapContainer>
          <h2 style={{ fontWeight: "300" }}>
            <FontAwesomeIcon icon={faMapLocationDot} className="icon" />
            {projectName.location.street.number}{" "}
            {projectName.location.street.name} {projectName.location.city},{" "}
            {projectName.location.state},{projectName.location.country},{" "}
            {projectName.location.postcode}
          </h2>

          <button className="button2" onClick={() => navigate("/")}>
            Go back
          </button>
        </div>
      </div>
    );
  }
}

export default UserProfilScreen;
