import { useState } from "react";

function Courses() {
  const [courseList] = useState([
    { id: 1, title: "React JS", category: "Frontend", students: 1000 },
    { id: 2, title: "Java Programming", category: "Backend", students: 800 },
    { id: 3, title: "Node JS", category: "Backend", students: 750 },
    { id: 4, title: "MongoDB Atlas", category: "Database", students: 450 },
    { id: 5, title: "MERN Stack", category: "Fullstack", students: 900 },
    { id: 6, title: "Spring Boot", category: "Backend", students: 650 },
    { id: 7, title: "Python for Data Science", students: 1200, category: "Data Science" } // <--- ADD THIS DEFAULT COURSE
  ]);

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <h1>Our Courses</h1>
        <p style={{ color: "#64748b", marginTop: "5px" }}>
          Explore our structured catalog containing {courseList.length} paths.
        </p>
      </div>

      {/* Structured flexbox grid container using existing card classes */}
      <div className="courses">
        {courseList.map((course) => (
          <div key={course.id} className="card">
            <div>
              <span className="course-badge">{course.category}</span>
              <h2 style={{ marginTop: "10px" }}>📘 {course.title}</h2>
              <p>Students enrolled: <strong>{course.students}</strong></p>
            </div>
            
            <div className="button-group">
              <button style={{ width: "100%" }}>Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;