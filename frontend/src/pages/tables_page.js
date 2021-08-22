import React from "react";
import GarbagesMap from "../componenets/garbage_map";
import EmptyingDatesArea from "../componenets/emptying_dates_area";
import GarbageChoiceArea from "../componenets/garbage_choice_area";
import GarbageSearch from "../componenets/garbage_search";
import GarbageCreatingArea from "../componenets/garbage_creating_area";
import GarbagesDownloderButton from "../componenets/garbage_downloader_button";

const GarbagesPage = () => {
  return (
    <>
      <EmptyingDatesArea />
      <GarbagesMap />
      <GarbageSearch />
      <GarbageChoiceArea />
      <GarbageCreatingArea />
      <GarbagesDownloderButton />
    </>
  );
};

export default GarbagesPage;
