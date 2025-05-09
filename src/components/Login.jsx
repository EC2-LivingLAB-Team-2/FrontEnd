import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="door-handle"></div>
      <div className="door-handle2"></div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="👤 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="divider-line" />
        <button type="submit">Log In</button>
        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/signup">Create Account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
