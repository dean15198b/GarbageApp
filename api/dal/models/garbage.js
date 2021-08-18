import mongoose from "mongoose";

const garbageSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      enum: ["Green", "Blue", "Orange", "Black"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Normal", "Paper Only", "Plastic Only"],
      required: true,
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
      },
    },
    emptyingDate: Date,
  },
  { _id: false }
);

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
