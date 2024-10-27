import { ThemeContext } from "@/context";
import { useContext } from "react";

export default function useMode() {
  return useContext(ThemeContext);
}
