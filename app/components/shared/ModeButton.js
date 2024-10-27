"use client";
import useMode from "@/app/hooks/useMode";
import { IoMoonSharp } from "react-icons/io5";
import { TbSunHigh } from "react-icons/tb";
export default function ModeButton() {
  const { theme, setTheme } = useMode();
  console.log(theme);
  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <li className="p-1.5 rounded-btn-with-inset-shadow" onClick={handleTheme}>
      {theme === "dark" ? (
        <TbSunHigh className="text-yellow-300" />
      ) : (
        <IoMoonSharp className="text-green-400" />
      )}
    </li>
  );
}
