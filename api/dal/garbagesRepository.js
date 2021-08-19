import GarbageModel from "./models/garbage.js";

export const getById = async (id) => {
  const ret = await GarbageModel.findById(id);
  return ret && ret.toJSON();
};

export const getByEmptyingDates = async (minDate = null, maxDate = null) => {
  let findDateCretiria = {};
  minDate && (findDateCretiria["$gte"] = minDate);
  maxDate && (findDateCretiria["$lt"] = maxDate);
  const findCretiria =
    Object.keys(findDateCretiria).length === 0
      ? {}
      : { emptyingDate: findDateCretiria };
  return (await GarbageModel.find(findCretiria)).map((garbage) =>
    garbage.toJSON()
  );
};

export const create = async (garbageInputs) => {
  const ret = await GarbageModel.create(garbageInputs);
  return ret.toJSON();
};

export const updateByIdIfExist = async (id, { location, emptyingDate }) => {
  const ret = await GarbageModel.findByIdAndUpdate(
    id,
    {
      location,
      emptyingDate: new Date(emptyingDate),
    },
    { new: true }
  );
  return ret && ret.toJSON();
};

export const deleteByIdIfExist = async (id) => {
  const ret = await GarbageModel.findByIdAndRemove(id);
  return ret && ret.toJSON();
};
