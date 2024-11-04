import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (e) => {
    const password = e.target.value;
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("http:/localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // エラーメッセージを表示
        setMessage(data.error || "An error occurred.");
      } else {
        // 成功メッセージを表示またはリダイレクト
        setMessage("Successfully signed in.");
        // 必要に応じて、ダッシュボードやホームにリダイレクトなど
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
