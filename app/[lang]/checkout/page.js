import CheckoutItemCard from "@/app/components/card/CheckoutItemCard";
import { OrderSummary } from "@/app/components/cart/OrderSummary";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { getDeleveryCost } from "@/app/utils";
import { auth } from "@/auth";
import {
  getSelectedCartProductByProductIds,
  getShippingAddressByUserId,
  getUserByEmail,
} from "@/db/queries";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Checkout({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session.user.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

  if (!shippingAddress) {
    redirect(
      `/en/account?selected=${searchParams.selected}&isCheckout=${true}`
    );
  }
  const productIds = searchParams?.selected?.split(",");
  const selectedProducts = await getSelectedCartProductByProductIds(
    productIds,
    user.id
  );

  const shippingCost = await getDeleveryCost(selectedProducts);

  return (
    <section className="container pb-16">
      <Breadcrumb name1="Shipping & Billing" />
      <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-5">
        {/* shipping address */}
        <div className="col-span-1 md:col-span-3">
          <div className="flex items-start justify-between px-4 py-3 rounded-md shadow-light-elevated_dark-elevated-dark">
            <div className="space-y-2">
              <div className="gap-5 flex-start">
                <p>{shippingAddress?.fullName}</p>
                <p>{shippingAddress?.mobile}</p>
              </div>
              <div>
                <p className="paragraph-lg-base">
                  {shippingAddress?.address}, {shippingAddress?.province},{" "}
                  {shippingAddress?.city}, {shippingAddress?.area}
                </p>
              </div>
            </div>
            <Link
              href={`/en/account/shipping-address/edit?selected=${
                searchParams.selected
              }&isCheckout=${true}`}
              className="transition-colors duration-300 text-primary-light hover:text-primary"
            >
              Edit
            </Link>
          </div>
          <div className="gap-4 flex-column">
            {selectedProducts?.length > 0 &&
              selectedProducts.map((product) => (
                <CheckoutItemCard key={product.id} product={product} />
              ))}
          </div>
        </div>
        <OrderSummary
          cartItems={selectedProducts}
          shippingCost={shippingCost}
          from="checkout"
        />
      </div>
    </section>
  );
}
