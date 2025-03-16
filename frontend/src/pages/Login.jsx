import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => { // ✅ Accept setUser prop to update state
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await login(username, password); // ✅ Receive user object

    if (user) {
      console.log("✅ Login successful!");
      setUser(user); // ✅ Update global user state
      navigate("/"); // ✅ Redirect to home page
    } else {
      console.log("❌ Login failed:", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
