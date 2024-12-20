"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const OrderSummary = ({ cartItems, shippingCost }) => {
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
    <aside className="relative top-0 grid-cols-1 col-span-1 px-4 py-6 space-y-5 text-base rounded-md md:sticky md:top-36 md:col-span-2 shadow-light-elevated_dark-elevated-dark">
      <h4 className="pb-2 text-lg border-b-light-default_dark-tertiary">
        Order Summary
      </h4>
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Subtotal ({cartItems?.length > 0 ? cartItems.length : 0} items)</p>
        <p>${subTotal}</p>
      </div>
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Shipping Fee</p>
        <p>${shippingCost}</p>
      </div>
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
      <div className="flex items-center justify-between font-bold ">
        <p>Total</p>
        <p className="text-primary">${totalPrice}</p>
      </div>

      {cartItems?.length > 0 && (
        <div>
          <Link
            href={`/en6/checkout?selected=${searchParams.get("selected")}`}
            className="relative w-full text-sm px-6 py-2.5 uppercase rounded-md text-primary shadow-light-elevated_dark-elevated-dark"
          >
            Proceed to Checkout ({cartItems?.length})
          </Link>
        </div>
      )}
    </aside>
  );
};
