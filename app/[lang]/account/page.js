import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return <div>This is account page</div>;
}
