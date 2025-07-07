import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { loadTasks, saveTasks } from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load user + theme initially
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

    setUser(savedUser);
    setDarkMode(savedDarkMode);
  }, []);

  // ✅ Load tasks AFTER user is set
  useEffect(() => {
    if (user) {
      const savedTasks = loadTasks("tasks");
      setTasks(savedTasks);
    }
  }, [user]);

  // ✅ Save tasks
  useEffect(() => {
    if (user) saveTasks("tasks", tasks);
  }, [tasks, user]);

  // ✅ Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (username) => {
    localStorage.setItem("username", username);
    setUser(username);
  };

const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout and clear all data?")) {
    localStorage.removeItem("username");
    localStorage.removeItem("tasks");
    localStorage.removeItem("darkMode");

    setUser(null);
    setTasks([]);
    setFilter("All");
    setEditingTask(null);
    setDarkMode(false);
  }
};

  const addTask = (task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updatedTask) => {
    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updated);
    setEditingTask(null);
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
<header className="app-header">
  <div className="header-left">
    <div className="logo">
      <span className="logo-icon">🌱</span>
      <h1>PlantTask</h1>
    </div>
    <p className="welcome-text">Welcome back, {user}!</p>
     <div className="header-right">
    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
      <span className="theme-text">{darkMode ? "Light" : "Dark"}</span>
    </button>
     <button 
      className="logout-btn" 
      onClick={handleLogout} 
      title="Logout and clear data"
    >
      ➡️
      <span className="logout-text">Logout</span>
    </button>
  </div>
  </div>
</header>

      <main className="app-main">
        <TaskForm
          onAdd={addTask}
          onEdit={updateTask}
          editingTask={editingTask}
        />
        <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={setEditingTask}
        />
      </main>
      
    </div>
  );
}

export default App;
