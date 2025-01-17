import { redirect } from "next/navigation";

export default function Success() {
  redirect("/");

  return <div>Success Payment</div>;
}
