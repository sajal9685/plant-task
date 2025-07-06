import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { loadTasks, saveTasks } from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updated) =>
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleTask = (id) =>
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  if (!user) return <Login onLogin={setUser} />;

  return (
     <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>{user}'s Task Tracker</h1>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }}>
          Logout
        </button>
       

        <button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

      </header>
      <TaskForm onAdd={addTask} onEdit={updateTask} editingTask={editingTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={setEditingTask}
      />
    </div>
  );
}

export default App;
