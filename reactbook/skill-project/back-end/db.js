import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/skill")
  .then(() => {
    console.log("MongoDB Connected Successfully to 'skill' database");
  })
  .catch((error) => {
    console.error("Database Connection Error:", error);
  });