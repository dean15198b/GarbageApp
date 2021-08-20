import express from "express";
import {
  getById,
  getByEmptyingDates,
  create,
  getGarbageColors,
  getGarbageTypes,
  updateById,
  deleteById,
} from "../controllers/garbages.js";
import asyncHandler from "express-async-handler";
import GarbageNotFoundByIdError from "../exceptions/garbageNotFound.js";

let garbagesRouter = express.Router();

garbagesRouter.get(
  "/colors",
  asyncHandler(async (req, res) => {
    res.status(200).send(await getGarbageColors());
  })
);

garbagesRouter.get(
  "/types",
  asyncHandler(async (req, res) => {
    res.status(200).send(await getGarbageTypes());
  })
);

garbagesRouter.get(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const id = req.params.garbageId;
    const garbage = await getById(id);
    if (!garbage) throw new GarbageNotFoundByIdError(id);
    res.status(200).send(garbage);
  })
);

garbagesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(
      await getByEmptyingDates(
        req.query["minEmptyingDate"],
        req.query["maxEmptyingDate"]
      )
    );
  })
);

garbagesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    res.status(201).send(await create(req.body));
  })
);

garbagesRouter.patch(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const id = req.params.garbageId;
    const garbage = await updateById(req.params.garbageId, req.body);
    res.status(201).send(garbage);
  })
);

garbagesRouter.delete(
  "/:garbageId",
  asyncHandler(async (req, res) => {
    const garbage = await deleteById(req.params.garbageId);
    res.status(201).send(garbage);
  })
);

export default garbagesRouter;
