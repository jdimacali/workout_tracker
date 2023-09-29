import axios from "axios";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, setError } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading} type="submit">Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default Login;
