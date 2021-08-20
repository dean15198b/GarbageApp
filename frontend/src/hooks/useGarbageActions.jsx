import { useContext } from "react";
import { GarbageActionsContext } from "../contexts/garbages_contexts";
import { GarbageChoiceActionsContext } from "../contexts/garbage_choice_context";

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

  return {
    setStartEmptyingDate,
    setEndEmptyingDate,
    updateGarbage,
    deleteGarbage,
    setGarbageChoice,
    getGarbageByLocation,
  };
};

export default useGarbageActions;
