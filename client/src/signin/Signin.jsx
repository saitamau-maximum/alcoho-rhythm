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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signin:8000", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if(!response.ok){
      const errorData = await response.json();

      if(errorData.error == "Invalid email or password."){
        setMessage("メールアドレスまたはパスワードが正しくありません。");
      } else {
        setMessage("通信エラーが発生しました。再度お試しください。");
      }
      clearForm();
      return; //処理を終了してリダイレクトさせない
    }
    
    navigate("/dashboard", { replace: true }); //サインインに成功したらリダイレクト
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
