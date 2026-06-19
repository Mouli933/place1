function Sidebar({ selectedCategory, setSelectedCategory }) {
  // Add "Data Science" to this array
  const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Data Science"];

  return (
    <aside>
      <h3>Categories</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              cursor: "pointer",
              padding: "12px 16px",
              borderRadius: "8px",
              background: selectedCategory === cat ? "#2563eb" : "transparent",
              color: selectedCategory === cat ? "#ffffff" : "#94a3b8",
              fontWeight: selectedCategory === cat ? "600" : "400",
              marginBottom: "5px",
              transition: "all 0.2s ease"
            }}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;