function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p className="date">{new Date(task.createdAt).toLocaleString()}</p>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => window.confirm("Delete task?") && onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
