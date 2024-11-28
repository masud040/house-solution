import { auth } from "@/auth";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export const PersonalProfile = async () => {
  const session = await auth();

  return (
    <div className="px-4 py-6 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          Personal Profile
        </h3>
        <Link href="/account/profile/edit" className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">{session?.user?.name}</h4>
        <p>{session?.user?.email}</p>
        {session?.user?.number ? (
          <p></p>
        ) : (
          <button className="py-1.5 px-4 transition-all duration-500 ease-in-out rounded-2xl flex-start shadow-light-elevated_dark-elevated-dark hover:bg-primary">
            <FiPlus className="text-2xl" /> <p>Add Number</p>
          </button>
        )}
      </div>
    </div>
  );
};
