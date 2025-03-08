import { NoDataFound } from "../../../shared/NoDataFound";
import OrderedProductCard from "./OrderedProductCard";

export default function AllOrders({ allItems }) {
  return (
    <div>
      <div className="items-center gap-4 px-6 py-4 mb-8 shadow-md flex-start">
        <label
          htmlFor="order_filter"
          className="text-sm font-medium md:text-base"
        >
          Filter by:{" "}
        </label>
        <select
          name="order_filter"
          id="order_filter"
          className="w-32 p-2 text-sm transition-colors duration-700 ease-in-out bg-transparent border rounded-md border-primary-light focus:border-transparent md:text-base focus:outline-none"
        >
          <option value="all">All Orders</option>
          <option value="5">Last 5 orders</option>
          <option value="30">Last 30 days</option>
          <option value="1_year">Last 1 year</option>
        </select>
      </div>
      {allItems.length > 0 ? (
        <div className="space-y-8">
          {allItems.map((order) => (
            <OrderedProductCard key={order.id} order={order} />
          ))}{" "}
        </div>
      ) : (
        <NoDataFound message="There is no orders placed yet." cart={true} />
      )}
    </div>
  );
}
