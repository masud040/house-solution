import OrderProcessTabsContainer from "@/app/components/track-order/order-process-category/OrderProcessTabsContainer";
import { getOrderItems } from "@/db/queries";

export default async function OrderDetails({ params: { user_id } }) {
  const allOrderedItems = await getOrderItems({
    userId: user_id,
    status: "all",
  });

  return (
    <section className="container pt-10 pb-16">
      <h1 className="mb-3 h5-md-h4-medium">My Orders</h1>
      <OrderProcessTabsContainer allOrderedItems={allOrderedItems} />
    </section>
  );
}
