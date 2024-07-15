import CartItems from "@/app/components/cart/CartItems";
import { OrderSummary } from "@/app/components/cart/OrderSummary";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getAllCartItemsById } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function CartPage({ searchParams: { selected } }) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  const cartItems = await getAllCartItemsById(session?.user?.email, selected);
  return (
    <section>
      <Breadcrumb name="Cart" />
      <div class="container  items-start gap-6 pt-4 pb-16">
        <div className="container grid items-start grid-cols-1 gap-6 pt-4 pb-16 md:grid-cols-4">
          <CartItems cartItems={cartItems} />
          <OrderSummary
            cartItems={cartItems?.filter((item) => item?.selected)}
          />
        </div>
      </div>
    </section>
  );
}
