import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const GarbageCreatingButton = ({ openDialog }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={openDialog}
    startIcon={<AddIcon />}
  >
    NEW Garbage
  </Button>
);

export default GarbageCreatingButton;
