import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");

  function validateForm() {
    if (username.length < 3) {
      setValidationMessage("Username must be at least 3 characters.");
      return false;
    }
    if (password.length < 6) {
      setValidationMessage("Password must be at least 6 characters.");
      return false;
    }
    setValidationMessage("");
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {validationMessage && <p className="validation">{validationMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
