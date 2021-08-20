import { useContext } from "react";
import { GarbagesContext } from "../contexts/garbages_contexts";
import { GarbageChoiceContext } from "../contexts/garbage_choice_context";

const useGarbages = () => {
  const {
    startEmptyingDate,
    endEmptyingDate,
    garbages,
    garbageTypes,
    garbageColors,
  } = useContext(GarbagesContext);
  const { garbageChoice } = useContext(GarbageChoiceContext);
  return {
    startEmptyingDate,
    endEmptyingDate,
    garbages,
    garbageTypes,
    garbageColors,
    garbageChoice,
  };
};

export default useGarbages;
