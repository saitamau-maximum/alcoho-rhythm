import "./App.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signin from "./signin/Signin";
import Register from "./register/Register";
import Signup from "./signup/Signup";

function isAuthenticated() {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("token="));
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
