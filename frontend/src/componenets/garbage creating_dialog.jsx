import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import EmptyingDatePicker from "./emptying_date_picker";
import Select from "@material-ui/core/Select";
import useGarbages from "../hooks/useGarbages";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ControlledOptionsInput from "./controled_options_input";
import ControledCoordinateInput from "./controled_coordinate_text_field";
import useGarbageActions from "../hooks/useGarbageActions";
import { createGarbage } from "../services/garbages_service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));
const defaultFormValues = {
  Latitude: "",
  Longtitude: "",
  ["Emptying Date"]: "",
  Color: "",
  Type: "",
};
const GarbageCreatingDialog = ({ closeDialog, isOpen }) => {
  const { handleSubmit, control, reset } = useForm(defaultFormValues);
  const classes = useStyles();
  const { garbageTypes, garbageColors } = useGarbages();
  const { createGarbageAndLoad } = useGarbageActions();

  const controledCoordinatesInputInfos = [
    { name: "Latitude" },
    { name: "Longtitude" },
  ];
  const controledOptionsInputInfos = [
    { name: "Color", options: garbageColors },
    { name: "Type", options: garbageTypes },
  ];

  const closeAndReset = () => {
    reset(defaultFormValues);
    closeDialog();
  };

  const addGarbageAndClose = async ({
    color,
    type,
    lat,
    lng,
    emptyingDate,
  }) => {
    await createGarbageAndLoad({ color, type, lat, lng, emptyingDate });
    closeAndReset();
  };
  const onSubmit = (form) => {
    console.log(form);

    addGarbageAndClose({
      color: form.Color,
      type: form.Type,
      lat: form.Latitude,
      lng: form.Longtitude,
      emptyingDate: form["Emptying Date"],
    });
  };
  return (
    <Dialog onClose={closeAndReset} open={isOpen}>
      {/* <DialogTitle>Add Garbage</DialogTitle> */}
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        {controledCoordinatesInputInfos.map((info) => (
          <ControledCoordinateInput
            key={info.name}
            name={info.name}
            control={control}
          />
        ))}
        <Controller
          name="Emptying Date"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <EmptyingDatePicker
                emptyingDate={value}
                setEmptyingDate={onChange}
                header="Empying Date"
                error={!!error}
              />
            );
          }}
          rules={{ required: "Emptying date required" }}
        />
        {controledOptionsInputInfos.map((info) => (
          <ControlledOptionsInput
            key={info.name}
            name={info.name}
            options={info.options}
            control={control}
          />
        ))}

        <div>
          <Button variant="contained" onClick={closeAndReset}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default GarbageCreatingDialog;
