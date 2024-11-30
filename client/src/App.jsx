import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signin from "./signin/Signin";
import Register from "./register/Register";
import Signup from "./signup/Signup";

// 認証状態を管理
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const authenticated = cookies.some((cookie) =>
        cookie.startsWith("token="),
      );
      setIsAuthenticated(authenticated);
    };

    checkAuth();

    // クッキーの変更を監視
    const interval = setInterval(checkAuth, 3000); // 1秒ごとにチェック
    return () => clearInterval(interval);
  }, []);

  return isAuthenticated;
}

function App() {
  const isAuthenticated = useAuth();

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
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Register /> : <Navigate to="/signin" replace />
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
