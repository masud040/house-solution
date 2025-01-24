import { PersonalProfileAddForm } from "@/app/components/Form/PersonalProfileAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";

export default async function EditPersonalProfile() {
  const session = await auth();
  const user = await getUserByEmail(session.user.email);
  return (
    <section className="container pt-10 pb-16">
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/en/account",
        }}
        name1="Profile"
      />
      <div className="container pb-16">
        <div className="max-w-lg p-6 rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="text-xl text-center">Edit Your Name</h2>
          <PersonalProfileAddForm userId={user.id} />
        </div>
      </div>
    </section>
  );
}
