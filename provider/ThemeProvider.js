"use client";
import { ThemeContext } from "@/context";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className={`${theme === "dark" ? "dark" : "light"} `}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
}
