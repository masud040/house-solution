import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";

export default async function Greetings() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="text-indigo-500 flex-end h5-medium">
      Welcome Back | {user?.name}
    </div>
  );
}
