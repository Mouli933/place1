import express from "express";
import mongoose from "mongoose"; // <-- IMPORT MONGOOSE FOR ID VALIDATION
const router = express.Router();
import Course from "../models/Course.js";

// GET ALL COURSES
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD NEW COURSE
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      students: req.body.students,
      category: req.body.category
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE COURSE BY ID (Fixed for explicit MongoDB Casting verification)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check if the string pattern is a valid 24-character hex MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid MongoDB Object ID format" });
    }

    // 2. Safely remove using the cast identifier
    const deletedCourse = await Course.findByIdAndDelete(id);
    
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found inside database collection" });
    }

    // 3. Send back a clean success verification state response
    return res.status(200).json({ success: true, message: "Course deleted successfully from database" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;