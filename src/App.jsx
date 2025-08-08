import React, { useState, useEffect } from "react";
import SnakeGame from "./components/SnakeGame";
import GameTitle from "./components/GameTitle";
import Footer from "./components/Footer";
import { FiSun, FiMoon } from "react-icons/fi";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 sm:p-6 transition-colors duration-700 ease-in-out
      ${
        darkMode
          ? "bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-gray-100"
          : "bg-gradient-to-r from-blue-400 via-blue-200 to-white text-gray-900"
      }`}
    >
      <header className="max-w-4xl w-full flex flex-col sm:flex-row justify-between items-center mb-8 select-none space-y-4 sm:space-y-0">
        <GameTitle darkMode={darkMode} />
        <button
          aria-label="Toggle Dark Mode"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          type="button"
        >
          {darkMode ? (
            <FiSun size={24} className="text-yellow-400" />
          ) : (
            <FiMoon size={24} className="text-blue-500" />
          )}
        </button>
      </header>

      <main className="w-full max-w-md flex-grow">
        <SnakeGame />
      </main>

      <Footer />
    </div>
  );
}
