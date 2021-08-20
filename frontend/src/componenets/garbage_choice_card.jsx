import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useGarbageActions from "../hooks/useGarbageActions";
import useGarbages from "../hooks/useGarbages";
import ChoiceCoordinateTextField from "./choice_coordinate_text_field";
import EmptyingDatePicker from "./emptying_date_picker";

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
    marginBottom: 12,
  },
});

const coordinateInfos = [
  { coordinateIndex: 1, coordinateName: "Latitude" },
  { coordinateIndex: 0, coordinateName: "Longitude" },
];

const GarbageChoiceCard = () => {
  const { garbageChoice } = useGarbages();
  const { updateGarbage, deleteGarbage, setGarbageChoice } =
    useGarbageActions();

  const { id, location, color, type, emptyingDate } = garbageChoice;
  const classes = useStyles();

  return (
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
          {`Color: ${color}
            Type: ${type}
          Latitude: ${location.coordinates[1]}
            Longitude: ${location.coordinates[0]}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {coordinateInfos.map(({ coordinateIndex, coordinateName }) => (
            <ChoiceCoordinateTextField
              coordinateIndex={coordinateIndex}
              coordinateName={coordinateName}
            />
          ))}
        </Typography>
        <Typography variant="body2" component="p">
          <EmptyingDatePicker
            emptyingDate={emptyingDate}
            setEmptyingDate={setGarbageChoice((garbage) => {
              let garbageCopy = JSON.parse(JSON.stringify(garbage));
              garbageCopy.emptyingDate = emptyingDate;
              return garbageCopy;
            })}
            header="Emptying Date"
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default GarbageChoiceCard;
