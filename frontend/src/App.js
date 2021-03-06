/* eslint-disable react/jsx-filename-extension */
import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import GarbagesPage from "./pages/tables_page";
import Navigator from "./componenets/navigator";
import { GarbagesProvider } from "./contexts/garbages_contexts";
import { SnackbarProvider } from "notistack";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 6),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky">
        <Navigator />
      </AppBar>
      <div className={classes.heroContent}>
        <SnackbarProvider maxSnack={3}>
          <GarbagesProvider>
            <Switch>
              <Route path="/">
                <GarbagesPage />
              </Route>
            </Switch>
          </GarbagesProvider>
        </SnackbarProvider>
      </div>
    </Router>
  );
}

export default App;
