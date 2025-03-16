import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }
  
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return true; // ✅ Return success
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false; // ✅ Return failure
    }
  };
  

  return { signup, isLoading, error };
}