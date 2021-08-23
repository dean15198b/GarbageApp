import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useGarbageActions from "../hooks/useGarbageActions";
import EmptyingDatePicker from "./emptying_date_picker";
import ControledCoordinateInput from "./controled_coordinate_text_field";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    maxWidth: 500,
  },
  title: {
    fontSize: 14,
  },
}));

const coordinateInfos = [
  { index: 1, name: "Latitude" },
  { index: 0, name: "Longtitude" },
];

const GarbageChoiceCard = ({ garbageChoice }) => {
  const { handleSubmit, control } = useForm();
  const { updateGarbage, deleteGarbage } = useGarbageActions();

  const { id, color, type } = garbageChoice;
  const classes = useStyles();
  const onSubmit = (form) => {
    updateGarbage(id, {
      lat: form.Latitude,
      lng: form.Longtitude,
      emptyingDate: form["Emptying Date"],
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {id}
          </Typography>
          <Typography variant="h5" component="h2">
            {`${type}, ${color}`}
          </Typography>
          {coordinateInfos.map((info) => (
            <ControledCoordinateInput
              key={info.name}
              name={info.name}
              control={control}
              defaultValue={garbageChoice.location.coordinates[info.index]}
            />
          ))}
          <Controller
            name="Emptying Date"
            control={control}
            defaultValue={garbageChoice.emptyingDate}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <EmptyingDatePicker
                emptyingDate={value}
                setEmptyingDate={onChange}
                header="Empying Date"
                error={!!error}
              />
            )}
            rules={{ required: "Emptying date required" }}
          />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit">
            SAVE CHANGES
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={(e) => deleteGarbage(id)}
          >
            DELETE
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default GarbageChoiceCard;
