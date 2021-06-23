import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import ChangeMapView from "./ChangeMapView";
import { setCircle } from "./utit";


function Map(props) {
  return (
    <div className="map">
      <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={props.center} zoom={props.zoom} />
        {setCircle(props.data, props.casesType)}
      </MapContainer>
    </div>
  );
}

export default React.memo(Map);
