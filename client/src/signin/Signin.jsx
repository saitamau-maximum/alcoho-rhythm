import React from 'react'
import { useRef } from "react";

function Signin() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const clearForm = () => {
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    const response = await fetch("/api/signin:8000", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // ここでリダイレクト？
    } else {
      // フォームをクリアして新しく入力してもらう？
      clearForm();
    }
    
  }
  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" ref={usernameRef} required />
        </div> 
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit">Signin</button>
      </form>
    </div>
  )
}

export default Signin;
