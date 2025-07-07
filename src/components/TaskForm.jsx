import { useEffect, useState } from "react";

function TaskForm({ onAdd, onEdit, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
    };

    editingTask ? onEdit(task) : onAdd(task);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form-container">
      
      <div className="task-form">
        <div className="form-header">
          <h3>{editingTask ? "🌿 Edit Task" : "🌱 Plant New Task"}</h3>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            required
          />
          <span className="input-icon">✏️</span>
        </div>
        <div className="input-group">
          <textarea
            placeholder="Add more details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <span className="input-icon">📝</span>
        </div>
        <button onClick={handleSubmit} className="submit-btn">
          {editingTask ? "🌿 Update Task" : "🌱 Plant Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
