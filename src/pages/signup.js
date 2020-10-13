import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await signup(email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          ></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
