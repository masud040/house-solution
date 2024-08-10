import { CartContext } from "@/context";
import { useContext } from "react";

export default function useCartData() {
  const { loading, setLoading } = useContext(CartContext);
  return { loading, setLoading };
}
