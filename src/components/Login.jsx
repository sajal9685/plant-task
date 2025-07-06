import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">🌱</span>
            <h1>PlantTask</h1>
          </div>
          <p className="tagline">Grow your productivity, one task at a time</p>
        </div>
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              required
            />
            <span className="input-icon">👤</span>
          </div>
          <button onClick={handleSubmit} className="login-btn">
            <span>Start Growing</span>
            <span className="btn-icon">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
