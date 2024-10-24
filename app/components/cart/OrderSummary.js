import { getDeleveryCost } from "@/app/utils";

export const OrderSummary = async ({ cartItems }) => {
  const subTotal = Math.floor(
    cartItems?.reduce(
      (total, item) =>
        total + item.quantity * item.price - (item.price * item.discount) / 100,
      0
    )
  );
  const shippingCost = await getDeleveryCost(cartItems);
  const totalPrice = Math.floor(subTotal + shippingCost);
  return (
    <aside className="grid-cols-1 top-0 relative md:sticky md:top-36 col-span-1 p-4 space-y-2.5 text-base bg-white rounded-sm md:col-span-2 shadow-light-elevated_dark-elevated-dark">
      <h4 className="pb-2 text-lg text-secondary-dark border-b-light-default_dark-tertiary">
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
          className="p-1.5 rounded-l-md input-field"
        />
        <button className="px-5 text-background-light rounded-r-md bg-secondary">
          Apply
        </button>
      </div>
      <div className="flex items-center justify-between font-bold ">
        <p>Total</p>
        <p className="text-primary">${totalPrice}</p>
      </div>

      <button
        type="submit"
        className="relative w-full px-6 py-2 uppercase rounded-md text-primary shadow-light-elevated_dark-elevated-dark"
      >
        Proceed to Checkout ({cartItems?.length})
      </button>
    </aside>
  );
};
