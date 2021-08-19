import GarbageModel from "../dal/models/garbage.js";
import connectDbs from "../dbsConnect.js";
import mongoose from "mongoose";
import { testGarbagesInput } from "./consts.js";

export const mochaHooks = {
  beforeAll: [
    async function () {
      await connectDbs();
    },
  ],
  beforeEach: [
    async function () {
      console.log("before");
      await mongoose.connection.collections.garbages.drop();
      await GarbageModel.insertMany(testGarbagesInput);
    },
  ],
};
