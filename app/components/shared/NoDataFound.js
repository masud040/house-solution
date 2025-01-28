import Link from "next/link";

export const NoDataFound = ({ message, cart }) => {
  return (
    <div className="flex-col h-20 font-medium flex-center">
      {message}
      {cart && (
        <Link href="/">
          <button className="px-4 py-3 mt-4 btn-shadow-light-defaut-dark-primary">
            Continue Shopping
          </button>
        </Link>
      )}
    </div>
  );
};
