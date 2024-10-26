import { ProfileEditForm } from "@/app/components/Form/ProfileEditForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function ProfileEdit() {
  return (
    <section className="container">
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/account",
        }}
        name1="Edit Profile"
      />
      <div className="container items-start gap-6 pt-4 pb-16">
        <h2 className="text-xl text-black">Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </section>
  );
}
