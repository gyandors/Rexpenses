/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext();

export default AuthContext;

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const loggedIn = !!token;

  function handleLogin(token) {
    setToken(token);
    localStorage.setItem('token', token);
  }

  const authCtxValue = {
    token: token,
    loggedIn: loggedIn,
    login: handleLogin,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
}
