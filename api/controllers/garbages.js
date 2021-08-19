import {
  create as dalCreate,
  deleteByIdIfExist as dalDeleteByIdIfExist,
  getByEmptyingDates as dalGetByEmptyingDates,
  getById as dalGetById,
  updateByIdIfExist as dalUpdateByIdIfExist,
} from "../dal/garbagesRepository.js";
import { GARBAGE_COLORS, GARBAGE_TYPES } from "../consts.js";
import { handleFoundGarbageById } from "./tools.js";

export const getGarbageColors = async () => GARBAGE_COLORS;
export const getGarbageTypes = async () => GARBAGE_TYPES;

export const getById = dalGetById;

export const getByEmptyingDates = dalGetByEmptyingDates;

export const create = dalCreate;

export const updateById = async (id, inputsToUpdate) =>
  handleFoundGarbageById(await dalUpdateByIdIfExist(id, inputsToUpdate), id);

export const deleteById = async (id) =>
  handleFoundGarbageById(await dalDeleteByIdIfExist(id), id);
