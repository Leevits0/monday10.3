import { useState } from "react";

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        setIsLoading(false);
        return false;
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Store user in localStorage
      setIsLoading(false);
      return user; // ✅ Return user object to update UI
    } catch (err) {
      setError("Network error, please try again.");
      setIsLoading(false);
      return false;
    }
  };

  return { login, isLoading, error };
}
