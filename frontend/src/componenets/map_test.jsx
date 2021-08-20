import React, { useState, useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { GarbagesContext } from "../contexts/garbages_contexts";

const containerStyle = {
  // width: "800px",
  height: "800px",
};
// const center = {
//   lat: 0,
//   lng: -180,
// };

const position = {
  lat: 37.772,
  lng: -122.214,
};
const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
  const [positions, setPositions] = useState([
    {
      lat: 31.771959,
      lng: 35.217018,
    },
  ]);
  return (
    <LoadScript googleMapsApiKey="AIzaSyBjVB68qjsvaOZJt_hL0u8EZhQCru9hV-U">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onDblClick={(e) => {
          console.log(e);
          const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          console.log([...positions, newPosition]);
          setPositions((positions) => [...positions, newPosition]);
        }}
        options={{ disableDoubleClickZoom: true }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {/* <Marker
          position={position}
          onClick={(e) => {
            console.log(e);
          }}
        /> */}
        {positions.map((p) => (
          <Marker key={JSON.stringify(p)} position={p} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
