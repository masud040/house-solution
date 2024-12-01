import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import {
  getSelectedCartProductByProductIds,
  getUserByEmail,
} from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Checkout({ searchParams }) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session.user.email);
  const productIds = searchParams?.selected?.split(",");
  const selectedProduct = await getSelectedCartProductByProductIds(
    productIds,
    user.id
  );
  console.log(selectedProduct);
  return (
    <section className="container">
      <Breadcrumb name1="Checkout" />
      <div className="gap-6 pb-16">Hello I am masud</div>
    </section>
  );
}
