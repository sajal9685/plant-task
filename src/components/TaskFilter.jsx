function TaskFilter({ filter, setFilter, tasks }) {
  const count = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="task-filter">
      {["All", "Completed", "Pending"].map((type) => (
        <button
          key={type}
          className={filter === type ? "active" : ""}
          onClick={() => setFilter(type)}
        >
          {type} ({count[type]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
