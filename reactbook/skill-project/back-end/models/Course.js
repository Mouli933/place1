import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Course", coursesSchema);