/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext();

export default AuthContext;

export function AuthContextProvider({ children }) {
  const [idToken, setIdToken] = useState(localStorage.getItem('idToken'));

  const [displayName, setDisplayName] = useState(
    localStorage.getItem('displayName')
  );

  const loggedIn = !!idToken;

  function handleLogin(idToken, displayName) {
    setDisplayName(displayName);
    setIdToken(idToken);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('displayName', displayName);
  }

  const authCtxValue = {
    displayName: displayName,
    idToken: idToken,
    loggedIn: loggedIn,
    login: handleLogin,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
}
