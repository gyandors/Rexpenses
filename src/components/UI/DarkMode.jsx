import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve dark mode preference from localStorage or check system preference
    const storedPreference = localStorage.getItem("isDarkMode");
    if (storedPreference !== null) {
      return JSON.parse(storedPreference);
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Apply dark mode class to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Listen for changes in system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const newMode = e.matches;
      setIsDarkMode(newMode);
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
