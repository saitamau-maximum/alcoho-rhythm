import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/signin/check", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/signin");
      });
  }, [navigate]);

  return (
    <div>
      <h1>Hello there, from Alcoho-Rhythm</h1>
    </div>
  );
}

export default Dashboard;
