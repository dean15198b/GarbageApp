import GarbageModel from "../dal/models/garbage.js";

export const getOneGarbage = async () => {
  const garbage = await GarbageModel.findOne({});
  return garbage.toJSON();
};
