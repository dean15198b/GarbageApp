import TextField from "@material-ui/core/TextField";
import React from "react";
import useGarbageActions from "../hooks/useGarbageActions";
import useGarbages from "../hooks/useGarbages";

const ChoiceCoordinateTextField = (coordinateIndex, coordinateName) => {
  const { garbageChoice } = useGarbages();
  const { setGarbageChoice } = useGarbageActions();
  return (
    <TextField
      required
      value={garbageChoice.location.coordinates[coordinateIndex]}
      onChange={(e) => {
        setGarbageChoice((garbage) => {
          let garbageClone = JSON.parse(JSON.stringify(garbage));
          garbageClone.location.coordinates[coordinateIndex] = e.target.value;
          return garbageClone;
        });
      }}
      id={`${coordinateName}-input-id`}
      label={coordinateName}
      type="number"
    />
  );
};

export default ChoiceCoordinateTextField;
