import React from "react";
import ButtonsArea from "./buttons_area";
import EmptyingDatePicker from "./emptying_date_picker";
import useGarbages from "../hooks/useGarbageActions";
import useGarbageAction from "../hooks/useGarbageActions";

const EmptyingDatesArea = () => {
  const { startEmptyingDate, endEmptyingDate } = useGarbages();
  const { setStartEmptyingDate, setEndEmptyingDate } = useGarbageAction();
  const buttonsInfo = [
    {
      emptyingDate: startEmptyingDate,
      setEmptyingDate: setStartEmptyingDate,
      header: "From Emptying Date",
    },
    {
      emptyingDate: endEmptyingDate,
      setEmptyingDate: setEndEmptyingDate,
      header: "Until Emptying Date",
    },
  ];

  return (
    <ButtonsArea
      buttons={buttonsInfo.map((btnInfo) => (
        <EmptyingDatePicker
          emptyingDate={btnInfo.emptyingDate}
          setEmptyingDate={btnInfo.setEmptyingDate}
          header={btnInfo.header}
        />
      ))}
    />
  );
};

export default EmptyingDatesArea;
