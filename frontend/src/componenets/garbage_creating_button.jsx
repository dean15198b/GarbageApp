import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const GarbageCreatingButton = ({ openDialog }) => (
  <Fab color="primary" onClick={openDialog}>
    <AddIcon />
  </Fab>
);

export default GarbageCreatingButton;
