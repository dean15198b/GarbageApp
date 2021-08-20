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
  const loadGarbages = async () =>
    setGarbages(
      await getGarbagesByEmptyingDates(startEmptyingDate, endEmptyingDate)
    );

  useEffect(() => {
    loadColorOptions();
    loadTypesOptions();
  }, []);

  useEffect(() => {
    loadGarbages();
  }, [startEmptyingDate, endEmptyingDate]);
  const getGarbageByLocation = (lng, lat) => {
    console.log(getGarbageLocationKey);
    return lnglatToGarbage[getGarbageLocationKey(lng, lat)];
  };

  return (
    <GarbagesContext.Provider
      value={{
        startEmptyingDate,
        endEmptyingDate,
        garbages,
        garbageTypes,
        garbageColors,
      }}
    >
      <GarbageActionsContext.Provider
        value={{
          setStartEmptyingDate,
          setEndEmptyingDate,
          loadGarbages,
          getGarbageByLocation,
        }}
      >
        {children}
      </GarbageActionsContext.Provider>
    </GarbagesContext.Provider>
  );
};
