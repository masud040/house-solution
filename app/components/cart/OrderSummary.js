export const OrderSummary = () => {
  return (
    <aside className="grid-cols-1 p-4 space-y-2 text-base bg-white rounded-sm shadow-custom">
      <h4 className="text-">Order Summary</h4>
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Subtotal(1 items)</p>
        <p>$40</p>
      </div>
      <div className="flex items-center justify-between text-sm font-bold">
        <p>Shipping Fee</p>
        <p>$10</p>
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
        <p>$50</p>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2 text-sm font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
      >
        Proceed to Checkout (1)
      </button>
    </aside>
  );
};
