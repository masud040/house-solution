import { ProfileEditForm } from "@/app/components/Form/PersonalProfileAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EditBillingAddress() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <section>
      <Breadcrumb name1="Account" name2="Profile" />
      <div className="container items-start gap-6 pt-4 pb-16">
        <h2 className="text-xl text-black">Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </section>
  );
}
