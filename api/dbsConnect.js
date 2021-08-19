import mongoose from "mongoose";

const connectDbs = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/garbages", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connection to mongo succeeded");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
    throw err;
  }
};

export default connectDbs;
