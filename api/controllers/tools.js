import GarbageNotFoundByIdError from "../exceptions/garbageNotFound.js";

export const handleFoundGarbageById = (garbage, id) => {
  if (!garbage) throw new GarbageNotFoundByIdError(id);
  return garbage;
};
