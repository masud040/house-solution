"use client";

export default function AddToCartBtn({ productId }) {
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <button
      onClick={handleAddToCart}
      className="block w-full py-1 text-center text-white transition border rounded-b bg-primary border-primary hover:bg-transparent hover:text-primary"
    >
      Add to cart
    </button>
  );
}
