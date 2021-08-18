import express from "express";
import * as garbageController from "../controllers/garbages.js";
import asyncHandler from "express-async-handler";
import GarbageNotFoundByIdError from "../exceptions/garbageNotFound.js";
import { testGarbageInput, testGarbage } from "../test/consts.js";
let garbagesRouter = express.Router();

garbagesRouter.get(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const id = req.params.garbageId;
    const garbage = await garbageController.getByID(id);
    checkGarbageExistanseAndResponse(res, 200, garbage, id);
  })
);

garbagesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(
      await garbageController.getByEmptyingDates(
        req.query["minEmptyingDate"],
        req.query["maxEmptyingDate"]
      )
    );
  })
);

garbagesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    res.status(201).send(await garbageController.create(req.body));
  })
);

garbagesRouter.patch(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const id = req.params.garbageId;
    const garbage = await garbageController.update(
      req.params.garbageId,
      req.body
    );
    checkGarbageExistanseAndResponse(res, 201, garbage, id);
  })
);

garbagesRouter.delete(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const garbage = await garbageController.deleteById(req.params.garbageId);
    checkGarbageExistanseAndResponse(res, 201, garbage, id);
  })
);

export default garbagesRouter;

const checkGarbageExistanseAndResponse = (res, statusCode, garbage, id) => {
  if (!garbage) throw new GarbageNotFoundByIdError(id);
  res.send;
  res.status(statusCode).send(garbage);
};
