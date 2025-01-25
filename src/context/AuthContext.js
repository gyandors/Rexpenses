import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export default function useAuthContext() {
  return useContext(AuthContext);
}
