import { useState, useEffect } from "react";
import axios from "axios"; 
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";

function Home({ selectedCategory }) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  
  const [newTitle, setNewTitle] = useState("");
  const [newStudents, setNewStudents] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");

  const API_URL = "http://localhost:5000/api/courses";

  // Automatically trigger a data pull when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(API_URL);
        setCourses(res.data); 
      } catch (error) {
        console.error("Axios retrieval error:", error);
      }
    };

    fetchCourses();
  }, []); // Clear array means it runs exactly once on load, satisfying ESLint!

  // Helper function to re-fetch data after a user mutation (Add/Delete)
  const refreshGrid = async () => {
    try {
      const res = await axios.get(API_URL);
      setCourses(res.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // CREATE: Post a new course directly to MongoDB using Axios
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newTitle || !newStudents) return alert("Please fill out all fields");

    const coursePayload = {
      title: newTitle,
      students: parseInt(newStudents, 10),
      category: newCategory, 
    };

    try {
      const res = await axios.post(API_URL, coursePayload);
      // Fixed condition to accept standard 200 or 201 response status codes
      if (res.status === 201 || res.status === 200) {
        setNewTitle("");
        setNewStudents("");
        refreshGrid(); // Refresh database grid dynamically
      }
    } catch (error) {
      console.error("Axios creation error:", error);
      alert("Backend server error! Make sure back-end is running.");
    }
  };

  // DELETE: Remove a course using its MongoDB _id via Axios
  const handleDeleteCourse = async (idToDelete) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await axios.delete(`${API_URL}/${idToDelete}`);
      if (res.status === 200) {
        refreshGrid(); // Refresh database grid dynamically
      }
    } catch (error) {
      console.error("Axios delete execution error:", error);
    }
  };

  const displayedCourses = courses
    .filter((c) => selectedCategory === "All" || c.category === selectedCategory)
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Hero />

      <div className="add-course-form">
        <h3>Add New Course</h3>
        <form onSubmit={handleAddCourse}>
          <input
            type="text"
            placeholder="Course Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Students count"
            value={newStudents}
            onChange={(e) => setNewStudents(e.target.value)}
          />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Cloud">Cloud</option>
            <option value="Data Science">Data Science</option>
          </select>
          <button type="submit" className="btn-success">
            Add Course
          </button>
        </form>
      </div>

      <div className="search-container">
        <input
          className="search"
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: "15px", alignItems: "center", fontWeight: "600" }}>
          <span>Showing: <span style={{ color: "#2563eb" }}>{selectedCategory}</span></span>
          <span style={{ background: "#cbd5e1", color: "#1e293b", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", display: "flex", alignItems: "center" }}>
            <span className="pulse-badge"></span>
            {displayedCourses.length} {displayedCourses.length === 1 ? 'Course' : 'Courses'} Available
          </span>
        </div>
      </div>

      <div className="courses">
        {displayedCourses.map((course) => (
          <CourseCard
            key={course._id} 
            title={course.title}
            students={course.students}
            onDelete={() => handleDeleteCourse(course._id)} 
          />
        ))}
      </div>
    </>
  );
}

export default Home;