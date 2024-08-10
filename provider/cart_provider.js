"use client";
import { CartContext } from "@/context";
import { useState } from "react";

export default function CartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <CartContext.Provider value={{ loading, setLoading }}>
      {children}
    </CartContext.Provider>
  );
}
