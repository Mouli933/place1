import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- ADDED ROUTING TOOLS
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./components/ThemeContext";
import "./app.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate(); // Hook for programmatically redirecting pages

  const navigateToHome = (category = "All") => {
    setSelectedCategory(category);
    navigate("/"); // Instantly bounces user back to the Home Dashboard URL
  };

  return (
    <ThemeProvider>
      <Navbar navigateToHome={navigateToHome} />
      
      <div className="layout">
        <Sidebar 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        
        <main>
          {/* Declarative client URL routing switch */}
          <Routes>
            <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;