import { ProfileEditForm } from "@/app/components/Form/PersonalProfileAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function EditPersonalAddress() {
  return (
    <section className="container">
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/account",
        }}
        name1="Shipping Address"
        name2="Edit"
      />
      <div className="container items-start gap-6 pt-4 pb-16">
        <h2 className="text-xl text-black">Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </section>
  );
}
