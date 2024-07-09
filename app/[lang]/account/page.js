import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <section>
      <Breadcrumb name="Account" />
    </section>
  );
}
