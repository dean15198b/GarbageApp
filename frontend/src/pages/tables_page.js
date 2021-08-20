import React from "react";
import GarbagesMap from "../componenets/garbage_map";
import EmptyingDatesArea from "../componenets/emptying_dates_area";
import GarbageChoiceArea from "../componenets/garbage_choice_area";
const GarbagesPage = () => {
  return (
    <>
      <EmptyingDatesArea />
      <GarbagesMap />
      <GarbageChoiceArea />
    </>
  );
};

export default GarbagesPage;
