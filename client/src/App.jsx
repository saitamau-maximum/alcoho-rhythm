import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signin from "./signin/Signin";
import Register from "./register/Register";
import Signup from "./signup/Signup";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
