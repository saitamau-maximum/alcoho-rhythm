import React from 'react'
import { useState } from "react";

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const clearForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("/api/signin:8000", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then(response => {
      if(!response.ok){
        console.error("サーバーエラー");
        clearForm();
        throw new Error(response.statusText);
      }
      console.log("success!");
      console.log(formData);
    })
    .catch(error => {
      console.error("通信に失敗しました", error);
    });
  }

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={formData.username} onChange={(e) => handleChange(e)} required />
        </div> 
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={(e) => handleChange(e)} required />
        </div>
        <button type="submit">Signin</button>
      </form>
    </div>
  )
}

export default Signin;
