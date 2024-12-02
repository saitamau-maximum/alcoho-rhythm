export const signin = async (email, password) => {
  const response = await fetch("http://localhost:8000/api/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.error);
  }
};
