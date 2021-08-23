import React, { useState, createContext, useMemo, useEffect } from "react";
import {
  getColorOptions,
  getTypesOptions,
  getGarbagesByEmptyingDates,
} from "../services/garbages_service.js";
// import getGarbageLocationKey from "../tools/garbage_location_key.js";

export const GarbagesContext = createContext();
export const GarbageActionsContext = createContext();

const getGarbageLocationKey = (lng, lat) => `${lng}-${lat}`;

export const GarbagesProvider = ({ children }) => {
  const [startEmptyingDate, setStartEmptyingDate] = useState(null);
  const [endEmptyingDate, setEndEmptyingDate] = useState(null);
  const [garbages, setGarbages] = useState([]);
  const [garbageTypes, setGarbageTypes] = useState([]);
  const [garbageColors, setGarbageColors] = useState([]);
  const [garbageChoices, setGarbageChoices] = useState([]);

  const lnglatToGarbage = useMemo(
    () =>
      Object.fromEntries(
        garbages.map((gar) => [
          getGarbageLocationKey(
            gar.location.coordinates[0],
            gar.location.coordinates[1]
          ),
          gar,
        ])
      ),
    [garbages]
  );
  const loadColorOptions = async () =>
    setGarbageColors(await getColorOptions());
  const loadTypesOptions = async () => setGarbageTypes(await getTypesOptions());

  const removeNotRelevantChoices = () =>
    setGarbageChoices((choices) =>
      choices.filter(
        (choice) =>
          garbages.findIndex((iterator) => iterator.id === choice.id) !== -1
      )
    );

  const loadGarbages = async () => {
    setGarbages(
      await getGarbagesByEmptyingDates(startEmptyingDate, endEmptyingDate)
    );
  };
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

  const getGarbageByLocation = (lng, lat) => {
    return lnglatToGarbage[getGarbageLocationKey(lng, lat)];
  };
  console.log(garbages);
  console.log(garbageChoices);
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
          getGarbageByLocation,
          setGarbageChoices,
        }}
      >
        {children}
      </GarbageActionsContext.Provider>
    </GarbagesContext.Provider>
  );
};
