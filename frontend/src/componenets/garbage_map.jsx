import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import useGarbages from "../hooks/useGarbages";
import useGarbageActions from "../hooks/useGarbageActions";
import { InfoWindow } from "@react-google-maps/api";
import GarbageChoiceCard from "./garbage_choice_card";

const containerStyle = {
  minHeight: 550,
  maxHeight: 600,
};
const center = {
  lat: 31.771959,
  lng: 35.217018,
};

function GarbagesMap() {
  const { garbages, garbageChoices } = useGarbages();
  const { chooseGarbage, unChooseGarbage } = useGarbageActions();
  return (
    <LoadScript googleMapsApiKey="AIzaSyBjVB68qjsvaOZJt_hL0u8EZhQCru9hV-U">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        options={{ disableDoubleClickZoom: true }}
      >
        <>
          {garbages.map((garbage) => (
            <Marker
              key={garbage.id}
              position={{
                lat: garbage.location.coordinates[1],
                lng: garbage.location.coordinates[0],
              }}
              onClick={() => chooseGarbage(garbage)}
            />
          ))}
          {garbageChoices.map((garbageChoice) => {
            return (
              <InfoWindow
                key={JSON.stringify(garbageChoice)}
                onCloseClick={() => unChooseGarbage(garbageChoice.id)}
                position={{
                  lat: garbageChoice.location.coordinates[1],
                  lng: garbageChoice.location.coordinates[0],
                }}
              >
                <GarbageChoiceCard garbageChoice={garbageChoice} />
              </InfoWindow>
            );
          })}
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GarbagesMap);
