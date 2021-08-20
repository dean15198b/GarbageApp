import TextField from "@material-ui/core/TextField";
import React from "react";
import useGarbageActions from "../hooks/useGarbageActions";
import useGarbages from "../hooks/useGarbages";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 8,
    marginBottom: 12,
    marginRight: 20,
  },
});

const ChoiceCoordinateTextField = ({ coordinateIndex, coordinateName }) => {
  const { garbageChoice } = useGarbages();
  const { setGarbageChoice } = useGarbageActions();
  const classes = useStyles();

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
      className={classes.pos}
    />
  );
};

export default ChoiceCoordinateTextField;
