import { useContext } from "react";
import { GarbageActionsContext } from "../contexts/garbages_contexts";
import { useSnackbar } from "notistack";
import {
  getGarbageById as getGarbageByIdCrud,
  createGarbage as createGarbageCrud,
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

  const crudAndUpdate = async (crudAction) => {
    const garbage = await crudAction();
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
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
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

  const chooseGarbageAndLoad = async (garbageToAdd) => {
    await loadGarbages();
    chooseGarbage(garbageToAdd);
  };

  const searchGarbageById = async (id) => {
    const searchedGarbage = await getGarbageByIdCrud(id);
    if (!searchedGarbage) notifyNoGarbageFoundById(id);
    else await chooseGarbageAndLoad(searchedGarbage);
  };

  const createGarbage = async (inputs) => {
    const newGarbage = await createGarbageCrud(inputs);
    await chooseGarbageAndLoad(newGarbage);
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
    createGarbage,
  };
};

export default useGarbageActions;
