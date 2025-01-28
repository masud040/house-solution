import { NoDataFound } from "../../shared/NoDataFound";
import OrderedProductCard from "./OrderedProductCard";

export default function ToPayOrders({ payingItems }) {
  return (
    <div>
      {payingItems.length > 0 ? (
        <div className="space-y-8">
          {payingItems.map((order) => (
            <OrderedProductCard key={order.id} order={order} />
          ))}{" "}
        </div>
      ) : (
        <NoDataFound message="There is no orders placed yet." cart={true} />
      )}
    </div>
  );
}
