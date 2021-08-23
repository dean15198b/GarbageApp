import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
}));

const ButtonsArea = ({ buttons }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Grid container spacing={2}>
          {buttons.map((button, index) => (
            <Grid item key={index}>
              {button}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ButtonsArea;
