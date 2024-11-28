"use client";
import useMode from "@/app/hooks/useMode";
import { IoMoonSharp } from "react-icons/io5";
import { TbSunHigh } from "react-icons/tb";
export default function ModeButton() {
  const { theme, setTheme } = useMode();
  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <li
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className="p-1.5 rounded-btn-with-inset-shadow"
      onClick={handleTheme}
    >
      {theme === "dark" ? (
        <TbSunHigh className="text-yellow-300" />
      ) : (
        <IoMoonSharp className="text-green-400" />
      )}
    </li>
  );
}
