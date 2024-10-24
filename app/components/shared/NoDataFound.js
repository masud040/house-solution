import Link from "next/link";

export const NoDataFound = ({ message, cart }) => {
  return (
    <div className="flex-col h-20 font-medium flex-center text-secondary">
      {message}
      {cart && (
        <Link href="/">
          <button className="px-4 py-2 mt-4 text-sm uppercase transition-all duration-300 border border-secondary hover:bg-secondary/20">
            Continue Shopping
          </button>
        </Link>
      )}
    </div>
  );
};
