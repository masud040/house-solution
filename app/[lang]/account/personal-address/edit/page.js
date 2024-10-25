import { ProfileEditForm } from "@/app/components/Form/ProfileEditForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function EditPersonalAddress() {
  return (
    <section>
      <Breadcrumb name1="Account" name2="Profile" name3="Personal Address" />
      <div className="container items-start gap-6 pt-4 pb-16">
        <h2 className="text-xl text-black">Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </section>
  );
}
