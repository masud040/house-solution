import OrderProcessTabsContainer from "@/app/components/track-order/order-process-category/OrderProcessTabsContainer";

export default async function OrderDetails({ params: { user_id } }) {
  return (
    <section className="container pt-10 pb-16">
      <h1 className="mb-3 h5-md-h4-medium">My Orders</h1>
      <OrderProcessTabsContainer />
    </section>
  );
}
