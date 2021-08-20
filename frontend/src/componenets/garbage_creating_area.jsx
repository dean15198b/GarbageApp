import React, { useState } from "react";
import GarbageCreatingButton from "./garbage_creating_button";
import GarbageCreatingDialog from "./garbage creating_dialog";

const GarbageCreatingArea = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  return (
    <>
      <GarbageCreatingButton openDialog={openDialog} />
      <GarbageCreatingDialog closeDialog={closeDialog} isOpen={isDialogOpen} />
    </>
  );
};

export default GarbageCreatingArea;
