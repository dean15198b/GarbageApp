import { useContext } from "react";
import { GarbageActionsContext } from "../contexts/garbages_contexts";
import { getGarbageById, createGarbage } from "../services/garbages_service";
import { useSnackbar } from "notistack";

import {
  updateGarbage as updateGarbageCrud,
  deleteGarbage as deleteGarbageCrud,
} from "../services/garbages_service";

const useGarbageActions = () => {
  const {
    setStartEmptyingDate,
    setEndEmptyingDate,
    loadGarbages,
    getGarbageByLocation,
    setGarbageChoices,
  } = useContext(GarbageActionsContext);
  const { enqueueSnackbar } = useSnackbar();

  const crudAndUpdate = async (crud) => {
    const garbage = await crud();
    loadGarbages();
    return garbage;
  };

  const updateGarbage = async (id, params) => {
    const updatedGarbage = await crudAndUpdate(() =>
      updateGarbageCrud(id, params)
    );
    chooseGarbage(updatedGarbage);
  };

  const deleteGarbage = async (id) => {
    await crudAndUpdate(() => deleteGarbageCrud(id));
    unChooseGarbage(id);
  };
  const notifyNoGarbageFoundById = (id) =>
    enqueueSnackbar(`No garbage was found with the ID ${id}`, {
      variant: "error",
    });

  const chooseGarbage = (garbageToAdd) => {
    unChooseGarbage(garbageToAdd.id);
    setGarbageChoices((garbages) => [
      ...garbages.filter((garbage) => garbage.id !== garbageToAdd.id),
      garbageToAdd,
    ]);
  };

  const unChooseGarbage = (garbageId) =>
    setGarbageChoices((garbages) =>
      garbages.filter((garbage) => garbage.id !== garbageId)
    );

  const changeGarbage = (changedGarbage) =>
    setGarbageChoices((garbages) => [
      ...garbages.filter((garbage) => garbage.id !== changedGarbage.id),
      changedGarbage,
    ]);

  const loadAndAddGarbageChoice = async (garbageToAdd) => {
    await loadGarbages();
    chooseGarbage(garbageToAdd);
  };

  const searchGarbageById = async (id) => {
    const searchedGarbage = await getGarbageById(id);
    if (!searchedGarbage) notifyNoGarbageFoundById(id);
    else await loadAndAddGarbageChoice(searchedGarbage);
  };

  const addGarbage = async (inputs) => {
    const newGarbage = await createGarbage(inputs);
    await loadAndAddGarbageChoice(newGarbage);
  };

  return {
    setStartEmptyingDate,
    setEndEmptyingDate,
    updateGarbage,
    deleteGarbage,
    chooseGarbage,
    unChooseGarbage,
    getGarbageByLocation,
    searchGarbageById,
    addGarbage,
    changeGarbage,
  };
};

export default useGarbageActions;
