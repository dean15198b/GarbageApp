import axios from "axios";

export const getColorOptions = async () =>
  (await axios.get("/garbages/colors")).data;

export const getTypesOptions = async () =>
  (await axios.get("/garbages/types")).data;

export const getGarbageById = async (id) => {
  let garbage = null;
  try {
    garbage = (await axios.get(`/garbages/${id}`)).data;
  } catch (e) {
    if (e.response.status !== 404) throw e;
  }
  return garbage;
};

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
  (
    await axios.patch(`/garbages/${id}`, {
      emptyingDate,
      location: { type: "Point", coordinates: [lng, lat] },
    })
  ).data;

export const deleteGarbage = async (id) =>
  (await axios.delete(`/garbages/${id}`)).data;

export const createGarbage = async ({ color, type, lat, lng, emptyingDate }) =>
  (
    await axios.post(`/garbages/`, {
      location: { coordinates: [lng, lat], type: "Point" },
      color,
      type,
      emptyingDate,
    })
  ).data;
