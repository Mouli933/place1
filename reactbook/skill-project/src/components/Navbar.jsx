import { useState, useContext } from "react";
import { Link } from "react-router-dom"; // <-- ADDED FOR CLEAN ROUTING TRANSITIONS
import { ThemeContext } from "./ThemeContext";

function Navbar({ navigateToHome }) {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);

  const dropdownCourses = ["Frontend", "Backend", "Database", "Cloud", "Data Science"];

  return (
    <nav>
      <h2 onClick={() => navigateToHome("All")} style={{ cursor: "pointer" }}>
        SkillHub
      </h2>

      <ul>
        <li onClick={() => navigateToHome("All")}>Home</li>

        <li 
          className="nav-dropdown-trigger"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          Courses ▼
          {open && (
            <div className="dropdown">
              {dropdownCourses.map((course, idx) => (
                <div 
                  key={idx} 
                  className="dropdown-item"
                  onClick={() => {
                    navigateToHome(course);
                    setOpen(false); 
                  }}
                >
                  📘 {course}
                </div>
              ))}
            </div>
          )}
        </li>

        {/* Link wraps navigation seamlessly to the /contact page route URL */}
        <li>
          <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
            Contact
          </Link>
        </li>
      </ul>

      <button onClick={() => setDark(!dark)}>
        {dark ? "Light ☀️" : "Dark 🌙"}
      </button>
    </nav>
  );
}

export default Navbar;