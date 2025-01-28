import { NoDataFound } from "../../shared/NoDataFound";
import OrderedProductCard from "./OrderedProductCard";

export default function AllOrders({ allItems }) {
  return (
    <div>
      <div className="items-center gap-4 px-8 py-5 mb-8 shadow-md flex-start">
        <label htmlFor="order_filter" className="font-medium">
          Filter by:{" "}
        </label>
        <select
          name="order_filter"
          id="order_filter"
          className="p-2.5 rounded-md w-40 bg-transparent border border-primary-light focus:border-transparent transition-colors duration-700 ease-in-out focus:outline-none"
        >
          <option value="all">All Orders</option>
          <option value="5">Last 5 orders</option>
          <option value="30">Last 30 days</option>
          <option value="1_year">Last 1 year</option>
        </select>
      </div>
      {allItems.length > 0 ? (
        allItems.map((order) => (
          <div key={order.id} className="space-y-8">
            {order.products.map((product) => (
              <OrderedProductCard
                key={product._id}
                productData={{
                  ...product,
                  createdAt: order.createdAt,
                  orderId: order.orderId,
                  mainId: order.id,
                  status: order.status,
                  ongoing_status: order.ongoing_status,
                  userId: order.userId,
                }}
              />
            ))}
          </div>
        ))
      ) : (
        <NoDataFound message="There is no orders placed yet." cart={true} />
      )}
    </div>
  );
}
