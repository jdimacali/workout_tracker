import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, setError, setIsLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      if (login) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
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
      <button disabled={isLoading} type="submit">
        Log In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default Login;
