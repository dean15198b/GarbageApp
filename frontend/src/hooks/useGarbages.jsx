import { useContext } from "react";
import { GarbagesContext } from "../contexts/garbages_contexts";

const useGarbages = () => {
  const {
    startEmptyingDate,
    endEmptyingDate,
    garbages,
    garbageTypes,
    garbageColors,
    garbageChoices,
  } = useContext(GarbagesContext);

  return {
    startEmptyingDate,
    endEmptyingDate,
    garbages,
    garbageTypes,
    garbageColors,
    garbageChoices,
  };
};

export default useGarbages;
