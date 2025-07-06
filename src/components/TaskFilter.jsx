function TaskFilter({ filter, setFilter, tasks }) {
  const count = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  const filterIcons = {
    All: "🌿",
    Completed: "✅",
    Pending: "🌱"
  };

  return (
    <div className="task-filter">
      {["All", "Completed", "Pending"].map((type) => (
        <button
          key={type}
          className={`filter-btn ${filter === type ? "active" : ""}`}
          onClick={() => setFilter(type)}
        >
          <span className="filter-icon">{filterIcons[type]}</span>
          <span>{type}</span>
          <span className="count">({count[type]})</span>
        </button>
      ))}
    </div>
  );
}
export default TaskFilter;
