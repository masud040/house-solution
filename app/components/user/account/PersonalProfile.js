import Link from "next/link";
import AddNumberBtn from "../../shared/Butttons/AddNumberBtn";

export const PersonalProfile = async ({ user }) => {
  return (
    <div className="p-5 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          Personal Profile
        </h3>
        <Link href="/en/user-profile/profile/edit" className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">{user?.name}</h4>
        <p className="text-sm">{user?.email}</p>
        {user?.mobile ? (
          <p className="text-sm">{user?.mobile}</p>
        ) : (
          <AddNumberBtn userId={user?.id} />
        )}
      </div>
    </div>
  );
};
