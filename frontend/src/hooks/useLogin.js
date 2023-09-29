import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(`http://localhost:4000/api/user/login`, {
      email,
      password,
    });

    const data = await response.data;

    if (response.status !== 200) {
      setIsLoading(false);
      setError(data);
    }

    if (response.status === 200) {
      // save the user to local storage: only takes strings
      localStorage.setItem("user", JSON.stringify(data));

      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return { login, error, isLoading, setError, setIsLoading };
};
