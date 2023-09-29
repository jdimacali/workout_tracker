import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

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
        value={password}
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading} type="submit">
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default Signup;
