import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // delete the user from local storage
    localStorage.removeItem("user");

    // update the auth context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
