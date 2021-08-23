import React from "react";
import GarbagesMap from "../componenets/garbage_map";
import EmptyingDatesArea from "../componenets/emptying_dates_area";
import GarbageSearch from "../componenets/garbage_search";
import GarbageCreatingArea from "../componenets/garbage_creating_area";
import GarbagesDownloderButton from "../componenets/garbage_downloader_button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GarbagesPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth={false}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <EmptyingDatesArea />
            </Grid>

            <Grid item xs={12}>
              <GarbagesMap />
            </Grid>
            <Grid item xs={6}>
              <GarbageSearch />
              <GarbageCreatingArea />
              <GarbagesDownloderButton />
            </Grid>

            <Grid item container justify="center" xs={6}></Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default GarbagesPage;
