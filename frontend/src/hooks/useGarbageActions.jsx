import { useContext } from "react";
import { GarbageActionsContext } from "../contexts/garbages_contexts";
import { GarbageChoiceActionsContext } from "../contexts/garbage_choice_context";
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
  } = useContext(GarbageActionsContext);
  const { setGarbageChoice } = useContext(GarbageChoiceActionsContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const crudAndUpdate = async (crud) => {
    const garbage = await crud();
    loadGarbages();
    return garbage;
  };

  const updateGarbage = (id, params) =>
    crudAndUpdate(() => updateGarbageCrud(id, params));

  const deleteGarbage = async (id) => {
    await crudAndUpdate(() => deleteGarbageCrud(id));
    setGarbageChoice(null);
  };
  const notifyNoGarbageFoundById = (id) =>
    enqueueSnackbar(`No garbage was found with the ID ${id}`, {
      variant: "error",
    });
  const searchGarbageById = async (id) => {
    const searchedGarbage = await getGarbageById(id);
    if (!searchedGarbage) notifyNoGarbageFoundById(id);
    else {
      setGarbageChoice(searchedGarbage);
      await loadGarbages();
    }
  };

  const addGarbage = async (inputs) => {
    await createGarbage(inputs);
    await loadGarbages();
  };

  return {
    setStartEmptyingDate,
    setEndEmptyingDate,
    updateGarbage,
    deleteGarbage,
    setGarbageChoice,
    getGarbageByLocation,
    searchGarbageById,
    addGarbage,
  };
};

export default useGarbageActions;
