import { NoDataFound } from "../../../shared/NoDataFound";
import OrderedProductCard from "./OrderedProductCard";

export default function ToReviewOrders({ reviewedItems }) {
  return (
    <div>
      {reviewedItems.length > 0 ? (
        <div className="space-y-8">
          {reviewedItems.map((order) => (
            <OrderedProductCard key={order.id} order={order} />
          ))}{" "}
        </div>
      ) : (
        <NoDataFound message="There is no orders placed yet." cart={true} />
      )}
    </div>
  );
}
