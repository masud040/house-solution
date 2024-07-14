import { getDeleveryCost } from "@/db/queries";

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
    <aside className="grid-cols-1 p-4 space-y-2 text-base bg-white rounded-sm shadow-custom">
      <h4 className="text-">Order Summary</h4>
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
          className="py-1 text-sm rounded-l-md focus:ring-0"
        />
        <button className="w-full text-white rounded-r-md bg-secondary">
          Apply
        </button>
      </div>
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2 text-sm font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
      >
        Proceed to Checkout ({cartItems?.length})
      </button>
    </aside>
  );
};
