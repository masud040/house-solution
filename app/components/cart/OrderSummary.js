"use client";
import { generateRequest } from "@/actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const OrderSummary = ({ cartItems, shippingCost, from }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const subTotal = Math.floor(
    cartItems?.reduce(
      (total, item) =>
        total + item.quantity * item.price - (item.price * item.discount) / 100,
      0
    )
  );
  const totalPrice = Math.floor(subTotal + shippingCost);
  const order_items_id = cartItems.map((item) => item.order_product_id);

  async function handlePaymentRequest() {
    setLoading(true);
    try {
      const data = await generateRequest({
        totalPrice: totalPrice,
        order_items_id: order_items_id,
      });

      const res = await fetch("/api/payment/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const response = await res.json();

      if (response.status === 200) {
        router.replace(response.url);
        setLoading(false);
      }
    } catch (error) {
      setGlobalError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="relative top-0 grid-cols-1 col-span-1 p-8 text-base rounded-md md:sticky md:top-36 md:col-span-2 shadow-light-elevated_dark-elevated-dark">
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
        className={`text-lg  pb-2 ${
          from !== "checkout" && "border-b-light-default_dark-tertiary"
        }`}
      >
        Order Summary
      </h4>
      <div className="pt-3 space-y-5">
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
          <div>
            <p className="text-primary text-end">${totalPrice}</p>
            {from === "checkout" && (
              <p className="pt-2 text-xs font-normal text-end">
                VAT included, where applicable
              </p>
            )}
          </div>
        </div>
        {cartItems?.length > 0 && (
          <div>
            <>
              {globalError && (
                <p className="text-sm text-red-600">{globalError}</p>
              )}
              {from !== "checkout" ? (
                <Link
                  href={`/en/checkout?selected=${searchParams.get("selected")}`}
                  className="block w-full px-6 py-3 text-sm text-center uppercase rounded-md text-primary shadow-light-elevated_dark-elevated-dark"
                >
                  Proceed to Checkout ({cartItems?.length})
                </Link>
              ) : (
                <button
                  onClick={handlePaymentRequest}
                  className="block w-full px-6 py-3 text-sm text-center uppercase rounded-md text-primary shadow-light-elevated_dark-elevated-dark"
                >
                  {loading ? "Processing..." : "Proceed to Pay"}
                </button>
              )}
            </>
          </div>
        )}
      </div>
    </aside>
  );
};
