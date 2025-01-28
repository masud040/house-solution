import { NoDataFound } from "../../shared/NoDataFound";
import OrderedProductCard from "./OrderedProductCard";

export default function ToShipOrder({ shipedItems }) {
  return (
    <div>
      <h2 className="mb-6 h5-md-h4-medium">Shipped Orders</h2>

      {shipedItems.length > 0 ? (
        shipedItems.map((order) => (
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
