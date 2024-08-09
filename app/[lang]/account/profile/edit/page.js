import { ProfileEditForm } from "@/app/components/Form/ProfileEditForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function ProfileEdit() {
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
