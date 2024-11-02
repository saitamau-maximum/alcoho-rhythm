import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const clearForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  
  const handleMessage = () => {
    setMessage("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/signin:8000", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        // サインインに成功したらリダイレクト
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        clearForm();
        setMessage("サインインに失敗しました。再度お試しください。");
      });
  };

  return (
    <>
      <div className="signin-container">
        <h2>Signin</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button className="submit-button" type="submit">Signin</button>
        </form>
        {/* エラーメッセージ　*/}
        {!(message == "") && (
          <div className="err-msg">
            <div onClick={handleMessage}>
              <span>×</span>
            </div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Signin;
