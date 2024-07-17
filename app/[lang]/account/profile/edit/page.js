import { ProfileEditForm } from "@/app/components/Form/ProfileEditForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function ProfileEdit() {
  return (
    <div>
      <Breadcrumb name1="Account" name2="Profile" />
      <ProfileEditForm />
    </div>
  );
}
