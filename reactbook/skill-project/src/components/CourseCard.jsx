function CourseCard({ title, students, onDelete }) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>Students: {students}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button>View Course</button>
        
        {/* Delete Action button */}
        <button 
          onClick={onDelete} 
          style={{ background: "#dc3545" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;