import Link from "next/link";

export const PersonalProfile = () => {
  return (
    <div className="px-4 pt-6 pb-8 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Personal Profile</h3>
        <Link href="/account/profile/edit" className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">John Doe</h4>
        <p className="text-gray-800">example@mail.com</p>
        <p className="text-gray-800">0811 8877 988</p>
      </div>
    </div>
  );
};
