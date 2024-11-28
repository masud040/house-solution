import CartItems from "@/app/components/cart/CartItems";
import { OrderSummary } from "@/app/components/cart/OrderSummary";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getAllCartItemsById } from "@/db/queries";
import CartProvider from "@/provider/cart_provider";
import { redirect } from "next/navigation";

export default async function CartPage({ searchParams: { selected } }) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  const cartItems = await getAllCartItemsById(session?.user?.email, selected);

  return (
    <CartProvider>
      <section className="container pb-16">
        <Breadcrumb name1="Cart" />
        <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-5">
          <CartItems cartItems={cartItems} />
          <OrderSummary
            cartItems={cartItems?.filter((item) => item?.selected)}
          />
        </div>
      </section>
    </CartProvider>
  );
}
