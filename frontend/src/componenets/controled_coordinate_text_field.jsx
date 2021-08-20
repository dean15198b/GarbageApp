import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";

const ControledCoordinateInput = ({ name, control }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label={name}
        variant="filled"
        value={value}
        onChange={onChange}
        error={!!error}
        type="number"
        helperText={error ? error.message : null}
      />
    )}
    rules={{ required: `${name} required` }}
  />
);

export default ControledCoordinateInput;
