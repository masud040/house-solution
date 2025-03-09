import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Greetings() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  if (user?.role !== "admin") {
    return redirect("/login");
  }
  return (
    <div className="text-indigo-500 flex-end h5-medium">
      Welcome Back | {user?.name}
    </div>
  );
}
