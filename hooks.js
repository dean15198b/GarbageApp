import GarbageModel from "../dal/models/garbage.js";
import connectDbs from "../dbsConnect.js";
import mongoose from "mongoose";
import { testGarbageInput } from "./consts.js";

exports.mochaHooks = {
  beforeEach: [
    async function () {
      await connectDbs();
      await mongoose.connection.collections.garbages.drop();
      await GarbageModel.create(testGarbageInput);
    },
  ],
};
