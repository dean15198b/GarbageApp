import mongoose from "mongoose";
import { GARBAGE_COLORS, GARBAGE_TYPES } from "../../consts.js";

const garbageSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: GARBAGE_COLORS,
    required: true,
  },
  type: {
    type: String,
    enum: GARBAGE_TYPES,
    require: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: (value) =>
        value &&
        value.length === 2 &&
        value.findIndex((coordinate) => typeof coordinate !== "number") ===
          -1 &&
        value[0] >= -180 &&
        value[0] <= 180 &&
        value[1] >= -90 &&
        value[1] <= 90,
    },
  },
  emptyingDate: { type: Date, required: true },
});

garbageSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const GarbageModel = mongoose.model("Garbage", garbageSchema);

export default GarbageModel;
