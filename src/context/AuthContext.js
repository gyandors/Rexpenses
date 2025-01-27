import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
  setIsLoading: () => {},
  budget: null,
  setBudget: () => {},
});

export default function useAuthContext() {
  return useContext(AuthContext);
}
