import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const minMaxByCoordinate = {
  Latitude: { min: -90, max: 90 },
  Longtitude: { min: -180, max: 180 },
};

const minMaxHelperTexts = {
  Latitude: "Latitude is between -90 and 90",
  Longtitude: "Longtitude is between -180 and 180",
};

const getHelperText = (error) => {
  if (!error) return null;
  return (
    error.message ||
    ((error.type === "max" || error.type === "min") &&
      minMaxHelperTexts[error.ref.name])
  );
};

const ControledCoordinateInput = ({ name, control, defaultValue }) => {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log(error);
        return (
          <TextField
            className={classes.root}
            label={name}
            margin="2"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            type="number"
            helperText={getHelperText(error)}
          />
        );
      }}
      rules={{
        required: `${name} required`,
        max: minMaxByCoordinate[name].max,
        min: minMaxByCoordinate[name].min,
      }}
    />
  );
};

export default ControledCoordinateInput;
