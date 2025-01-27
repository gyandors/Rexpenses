import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { auth } from "../firebase";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [loggedIn, setLoggedIn] = useState(!!user);
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState(1000);

  function login(user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedIn(true);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    setLoggedIn(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, []);

  const authCtxValue = {
    user,
    loggedIn,
    login,
    logout,
    isLoading,
    setIsLoading,
    budget,
    setBudget,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
}
