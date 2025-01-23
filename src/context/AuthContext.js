import { createContext, useContext } from "react";

export const AuthContext = createContext({
  idToken: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export default function useAuthContext() {
  return useContext(AuthContext);
}
