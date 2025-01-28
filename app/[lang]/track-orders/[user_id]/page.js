import { auth } from "@/auth";
import { getOrderItems } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function OrderDetails({ params: { user_id } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect("/");
  }
  const allOrderedItems = await getOrderItems({
    userId: user_id,
    ongoing_status: "all",
  });
  console.log(allOrderedItems);
  const payOrderItems = allOrderedItems.filter(
    (item) => item.ongoing_status === "to-pay" && item.status === "pending"
  );

  const shipedOrderItems = allOrderedItems.filter(
    (item) =>
      item.ongoing_status === "to-ship" ||
      (item.ongoing_status === "seller-to-pack" && item.status === "shipped") ||
      item.status === "Seller to Pack"
  );
  const receivedOrderItems = allOrderedItems.filter(
    (item) => item.ongoing_status === "to-receive" && item.status === "success"
  );
  // const reviewItems = allOrderedItems.filter(
  //   (item) => item.ongoing_status === "to-review" && item.status === "success"
  // );

  return (
    <section className="container pt-10 pb-16">
      <h1 className="mb-3 h5-md-h4-medium">My Orders</h1>
      {/* <OrderProcessTabsContainer
        allOrderedItems={allOrderedItems}
        payOrderItems={payOrderItems}
        shipedOrderItems={shipedOrderItems}
        receivedOrderItems={receivedOrderItems}
        reviewItems={reviewItems}
      /> */}
    </section>
  );
}
