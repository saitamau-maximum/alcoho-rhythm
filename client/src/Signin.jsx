import React from 'react'
import { useRef } from "react";

function Signin() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    console.log(userData);
  }
  return (
    <div>
      <h2>Signin</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" ref={usernameRef} />
        </div> 
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" ref={passwordRef} />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Signin</button>
      </form>
    </div>
  )
}

export default Signin;
