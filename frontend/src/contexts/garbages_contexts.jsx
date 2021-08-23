import React, { useState, createContext, useMemo, useEffect } from "react";
import {
  getColorOptions,
  getTypesOptions,
  getGarbagesByEmptyingDates,
} from "../services/garbages_service.js";

export const GarbagesContext = createContext();
export const GarbageActionsContext = createContext();

export const GarbagesProvider = ({ children }) => {
  const [startEmptyingDate, setStartEmptyingDate] = useState(null);
  const [endEmptyingDate, setEndEmptyingDate] = useState(null);
  const [garbages, setGarbages] = useState([]);
  const [garbageTypes, setGarbageTypes] = useState([]);
  const [garbageColors, setGarbageColors] = useState([]);
  const [garbageChoices, setGarbageChoices] = useState([]);

  const loadColorOptions = async () =>
    setGarbageColors(await getColorOptions());

  const loadTypesOptions = async () => setGarbageTypes(await getTypesOptions());

  const loadGarbages = async () => {
    setGarbages(
      await getGarbagesByEmptyingDates(startEmptyingDate, endEmptyingDate)
    );
  };

  const removeNotRelevantChoices = () =>
    setGarbageChoices((choices) =>
      choices.filter(
        (choice) =>
          garbages.findIndex((iterator) => iterator.id === choice.id) !== -1
      )
    );

  useEffect(() => {
    removeNotRelevantChoices();
  }, [garbages]);

  useEffect(() => {
    loadColorOptions();
    loadTypesOptions();
  }, []);

  useEffect(() => {
    loadGarbages();
  }, [startEmptyingDate, endEmptyingDate]);

  return (
    <GarbagesContext.Provider
      value={{
        startEmptyingDate,
        endEmptyingDate,
        garbages,
        garbageTypes,
        garbageColors,
        garbageChoices,
      }}
    >
      <GarbageActionsContext.Provider
        value={{
          setStartEmptyingDate,
          setEndEmptyingDate,
          loadGarbages,
          setGarbageChoices,
        }}
      >
        {children}
      </GarbageActionsContext.Provider>
    </GarbagesContext.Provider>
  );
};
