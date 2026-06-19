import express from "express";
import cors from "cors";
import "./db.js"; // Initializes the database connection
import courseRoutes from "./routes/courses.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("SkillHub Management Server Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});