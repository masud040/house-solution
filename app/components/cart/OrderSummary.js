"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const OrderSummary = ({ cartItems, shippingCost, from }) => {
  const searchParams = useSearchParams();
  const subTotal = Math.floor(
    cartItems?.reduce(
      (total, item) =>
        total + item.quantity * item.price - (item.price * item.discount) / 100,
      0
    )
  );
  const totalPrice = Math.floor(subTotal + shippingCost);
  return (
    <aside className="relative top-0 grid-cols-1 col-span-1 px-4 py-6 text-base rounded-md md:sticky md:top-36 md:col-span-2 shadow-light-elevated_dark-elevated-dark">
      {from === "checkout" && <h4 className="text-lg">Promotion</h4>}
      {from === "checkout" && (
        <div className="flex my-4 text-sm">
          <input
            type="text"
            placeholder="Enter Sokher Corner Code"
            className="p-2 rounded-l-md input-field"
          />
          <button className="px-5 text-background-light rounded-r-md bg-secondary dark:bg-primary">
            Apply
          </button>
        </div>
      )}
      <h4
        className={`text-lg ${
          from !== "checkout" ? "border-b-light-default_dark-tertiary" : "pb-2"
        }`}
      >
        Order Summary
      </h4>
      <div className="space-y-5">
        <div className="flex items-center justify-between text-sm font-medium">
          <p>
            {from === "checkout" ? "Items Total" : "Subtotal"} (
            {cartItems?.length > 0 ? cartItems.length : 0} items)
          </p>
          <p>${subTotal}</p>
        </div>
        <div className="flex items-center justify-between text-sm font-medium">
          <p>{from === "checkout" ? "Delivery Fee" : "Shipping Fee"}</p>
          <p>${shippingCost}</p>
        </div>
        {from !== "checkout" && (
          <div className="flex text-sm">
            <input
              type="text"
              placeholder="Enter Voucher Code"
              className="p-2 rounded-l-md input-field"
            />
            <button className="px-5 text-background-light rounded-r-md bg-secondary dark:bg-primary">
              Apply
            </button>
          </div>
        )}
        <div
          className={`text-lg flex items-center pt-2 justify-between font-bold ${
            from === "checkout" && "border-t-light-default_dark-tertiary"
          }`}
        >
          <p>Total</p>
          <p className="text-primary">${totalPrice}</p>
        </div>

        {cartItems?.length > 0 && (
          <div>
            <Link
              href={`/en6/checkout?selected=${searchParams.get("selected")}`}
              className="block w-full px-6 py-3 text-sm text-center uppercase rounded-md text-primary shadow-light-elevated_dark-elevated-dark"
            >
              Proceed to Checkout ({cartItems?.length})
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
