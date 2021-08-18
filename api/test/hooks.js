import GarbageModel from "../dal/models/garbage.js";
import connectDbs from "../dbsConnect.js";
import mongoose from "mongoose";
import { testGarbageInput } from "./consts.js";

export const mochaHooks = {
  beforeAll: [
    async function () {
      await connectDbs();
    },
  ],
  beforeEach: [
    async function () {
      await mongoose.connection.collections.garbages.drop();
      await GarbageModel.create(testGarbageInput);
    },
  ],
};
