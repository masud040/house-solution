import OrderProcessTabsContainer from "@/app/components/user/track-order/order-process-category/OrderProcessTabsContainer";
import { auth } from "@/auth";
import { getOrderItems, getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function OrderDetails({ params: { user_id } }) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  if (user?.id !== user_id) {
    return redirect("/");
  }
  const allOrderedItems = await getOrderItems({
    userId: user_id,
    ongoing_status: "all",
  });

  const payOrderItems = allOrderedItems.filter(
    (item) => item.ongoing_status === "processing" && item.status === "pending"
  );

  const shipedOrderItems = allOrderedItems.filter(
    (item) =>
      item.ongoing_status === "seller-to-pack" &&
      (item.status === "shipped" || item.status === "seller to pack")
  );

  const receivedOrderItems = allOrderedItems.filter(
    (item) => item.ongoing_status === "to-received" && item.status === "success"
  );
  const reviewItems = allOrderedItems.filter(
    (item) => item.ongoing_status === "to-reviewed" && item.status === "success"
  );

  return (
    <section className="container pt-10 pb-16">
      <h1 className="mb-3 h5-md-h4-medium">My Orders</h1>

      <OrderProcessTabsContainer
        allOrderedItems={allOrderedItems}
        payOrderItems={payOrderItems}
        shipedOrderItems={shipedOrderItems}
        receivedOrderItems={receivedOrderItems}
        reviewItems={reviewItems}
      />
    </section>
  );
}
