import GarbageModel from "./models/garbage.js";
import mongoose from "mongoose";

export const getById = async (id) => {
  const ret = await GarbageModel.findById(id);
  return ret && ret.toJSON();
};

export const getByEmptyingDates = async (minDate = null, maxDate = null) => {
  let findDateCretiria = {};
  minDate && (findDateCretiria["$gte"] = minDate);
  maxDate && (findDateCretiria["$lt"] = maxDate);
  const findCretiria =
    findDateCretiria === {} ? {} : { emptyingDate: findDateCretiria };
  return (await GarbageModel.find(findCretiria)).map((garbage) =>
    garbage.toJSON()
  );
};

export const create = async (garbageInputs) => {
  const ret = await GarbageModel.create(garbageInputs);
  return ret.toJSON();
};

export const update = async (id, { location, emptyingDate }) => {
  const ret = await GarbageModel.findByIdAndUpdate(id, {
    location,
    emptyingDate,
  });
  return ret && ret.toJSON();
};

export const deleteById = async (id) => {
  const ret = await GarbageModel.findByIdAndRemove(id);
  return ret && ret.toJSON();
};
