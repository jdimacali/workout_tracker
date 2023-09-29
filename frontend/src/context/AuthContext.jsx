import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialAuthState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // get the user in local storage if they exist in local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log({ authContextState: state });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
