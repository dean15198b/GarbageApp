import React from "react";
import { Controller } from "react-hook-form";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const ControlledOptionsInput = ({ control, name, options }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      return (
        <>
          <InputLabel>{name}</InputLabel>
          <Select value={value} onChange={onChange} error={!!error}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }}
    rules={{ required: `${name} required` }}
  />
);

export default ControlledOptionsInput;
