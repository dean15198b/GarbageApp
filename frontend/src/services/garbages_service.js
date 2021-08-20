import axios from "axios";

export const getColorOptions = async () =>
  (await axios.get("/garbages/colors")).data;

export const getTypesOptions = async () =>
  (await axios.get("/garbages/types")).data;

export const getGarbagesByEmptyingDates = async (
  minEmptyingDate = null,
  maxEmptyingDate = null
) => {
  let params = {};
  minEmptyingDate && (params.minEmptyingDate = minEmptyingDate);
  maxEmptyingDate && (params.maxEmptyingDate = maxEmptyingDate);
  const response = await axios.get("/garbages", { params });
  return response.data;
};

export const updateGarbage = async (id, { emptyingDate, lat, lng }) =>
  (await axios.patch(`/garbages/${id}`),
  { emptyingDate, location: { type: "Point", coordinates: [lng, lat] } }).data;

export const deleteGarbage = async (id) =>
  (await axios.delete(`/garbages/${id}`)).data;
