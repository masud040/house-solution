import Link from "next/link";

export const PersonalProfile = () => {
  return (
    <div className="px-4 py-6 rounded shadow-light-elevated_dark-elevated-dark bg-background-light">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist">Personal Profile</h3>
        <Link href="/account/profile/edit" className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-secondary-darker">John Doe</h4>
        <p className="text-secondary-dark">example@mail.com</p>
        <p className="text-secondary-dark">0811 8877 988</p>
      </div>
    </div>
  );
};
