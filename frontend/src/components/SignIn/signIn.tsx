import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css-files/signIn.css";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/Home");
  };

  return (
    <div className="signin-container">
      <div className="signin-form1">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="signin-button1"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        <div className="signup-link1">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
