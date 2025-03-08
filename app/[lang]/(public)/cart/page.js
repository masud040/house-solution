import Breadcrumb from "@/app/components/shared/Breadcrumb";
import CartItems from "@/app/components/user/cart/CartItems";
import { OrderSummary } from "@/app/components/user/cart/OrderSummary";
import { getDeleveryCost } from "@/app/utils";
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
  const shippingCost = await getDeleveryCost(
    cartItems?.filter((item) => item?.selected)
  );

  return (
    <CartProvider>
      <section className="container pt-6 pb-16">
        <Breadcrumb name1="Cart" />
        <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-5">
          <CartItems cartItems={cartItems} />
          <OrderSummary
            cartItems={cartItems?.filter((item) => item?.selected)}
            shippingCost={shippingCost}
          />
        </div>
      </section>
    </CartProvider>
  );
}
