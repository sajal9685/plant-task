function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className="task-status">{task.completed ? "🌳" : "🌱"}</span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <p className="task-date">
          <span className="date-icon">📅</span>
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      <div className="task-actions">
        <button 
          className="action-btn complete-btn"
          onClick={() => onToggle(task.id)}
          title={task.completed ? "Mark as pending" : "Mark as complete"}
        >
          {task.completed ? "🔄" : "✅"}
        </button>
        <button 
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={() => window.confirm("Are you sure you want to delete this task?") && onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
