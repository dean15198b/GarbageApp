import GarbageModel from "../dal/models/garbage.js";
import connectDbs from "../dbsConnect.js";
import mongoose from "mongoose";
import { testGarbagesInput } from "./consts.js";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

export const mochaHooks = {
  beforeAll: [
    async function () {
      await connectDbs();
    },
  ],
  beforeEach: [
    async function () {
      try {
        await mongoose.connection.collections.garbages.drop();
      } catch (err) {
        console.log(`Error on droping garbages collection. error: ${err}`);
      }

      await GarbageModel.insertMany(testGarbagesInput);
    },
  ],
};
