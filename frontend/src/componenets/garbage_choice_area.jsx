import useGarbages from "../hooks/useGarbages";
import GarbageChoiceCard from "./garbage_choice_card";
import Grid from "@material-ui/core/Grid";

const GarbageChoiceArea = () => {
  const { garbageChoice } = useGarbages();
  return garbageChoice && <GarbageChoiceCard />;
};

export default GarbageChoiceArea;
