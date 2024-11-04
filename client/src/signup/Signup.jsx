import { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    weight: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const data = {
      username: formData.username,
      weight: formData.weight,
      email: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:8000/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            setError("このメールアドレスは既に登録されています。");
          } else if (res.status === 500) {
            setError(
              "サーバーエラーが発生しました。後でもう一度お試しください。",
            );
          } else {
            setError("不明なエラーが発生しました。");
          }
        }
        return res.json();
      })
      .then((data) => {
        console.log("User registered successfully:", data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <div className="error-message">{error}</div>} {}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
