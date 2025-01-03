"use client";
import { ThemeContext } from "@/context";
import { useState } from "react";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className={`${theme === "dark" ? "dark" : "light"} `}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
}
