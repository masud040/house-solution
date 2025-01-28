import OrderedProductCard from "./OrderedProductCard";

export default function AllOrders({ allItems }) {
  return (
    <div>
      <h2 className="mb-6 h5-md-h4-medium">All Orders</h2>
      <ul>
        {allItems.map((order) => (
          <li key={order.id}>
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <OrderedProductCard
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
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
