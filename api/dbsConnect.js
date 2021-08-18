import mongoose from "mongoose";

const connectDbs = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to mongo succeeded");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

export default connectDbs;
