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

const ChoiceCoordinateTextField = ({ coordinateName, value, setValue }) => {
  const classes = useStyles();
  return (
    <TextField
      required
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
      id={`${coordinateName}-input-id`}
      label={coordinateName}
      type="number"
      className={classes.pos}
    />
  );
};

export default ChoiceCoordinateTextField;
