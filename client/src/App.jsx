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

function AuthenticatedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link> | <Link to="/register">Register</Link>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
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
