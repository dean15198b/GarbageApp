import GarbageNotFoundByIdError from "../exceptions/garbageNotFound.js";
import mongoose from "mongoose";

const normalUserErrorHandler = (res, err) => res.status(400).send(err.message);
const garbageNotFoundErrorHandler = (res, err) =>
  res.status(404).send(err.message);

const userErrorTypes = {
  [GarbageNotFoundByIdError.name]: garbageNotFoundErrorHandler,
  [mongoose.Error.CastError.name]: normalUserErrorHandler,
  [mongoose.Error.ValidationError.name]: normalUserErrorHandler,
};

const errorHandler = (err, req, res, next) => {
  console.error(`Exception was thrown. 
  Name: ${err.name} 
  Message: ${err.message}
  Stack: ${err.stack} `);
  if (userErrorTypes[err.name]) userErrorTypes[err.name](res, err);
  else res.status(500).send("Server Error");
};

export default errorHandler;
