import OrderProcessTabsContainer from "@/app/components/track-order/order-process-category/OrderProcessTabsContainer";
import { getOrderItems } from "@/db/queries";

export default async function OrderDetails({
  params: { user_id },
  searchParams: { active_tab },
}) {
  const allOrderedItems = await getOrderItems({
    status: active_tab,
    userId: user_id,
  });
  console.log(allOrderedItems);
  return (
    <section className="container pt-10 pb-16">
      <h1 className="mb-3 h5-md-h4-medium">My Orders</h1>
      <OrderProcessTabsContainer ordered_items={allOrderedItems} />
    </section>
  );
}
