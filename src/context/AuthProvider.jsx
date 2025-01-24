import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [isLoading, setIsLoading] = useState(false);

  const loggedIn = !!accessToken;

  function login(user) {
    setAccessToken(user.accessToken);
    localStorage.setItem("accessToken", user.accessToken);
  }

  function logout() {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  }

  const authCtxValue = {
    accessToken,
    loggedIn,
    login,
    logout,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
}
