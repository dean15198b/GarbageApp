import * as crud from "../dal/garbagesRepository.js";

export const getByID = crud.getById;

export const getByEmptyingDates = crud.getByEmptyingDates;

export const create = crud.create;

export const update = crud.update;

export const deleteById = crud.deleteById;