import GarbageModel from "../dal/models/garbage.js";
import connectDbs from "../dbsConnect.js";
import mongoose from "mongoose";

export const mochaHooks = {
  beforeEach(done) {
    // do something before every tes
    connectDbs();
    mongoose.connection.collections.garbages.drop();
    done();
  },
};
