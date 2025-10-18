"use client";
import { logoutUser } from "@/controllers/actions/logoutUserAction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string;
}

interface UserMenuProps {
  user: User;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  showUserDetails,
  setShowUserDetails,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="relative flex items-center gap-3 z-10">
      <button
        onClick={() => setShowUserDetails(!showUserDetails)}
        className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center focus:outline-none"
      >
        <Image
          src="/img/Unknown_person.jpg"
          alt="User avatar"
          width={40}
          height={40}
        />
      </button>

      {showUserDetails && (
        <div className="absolute top-12 right-0 w-60 bg-white border border-gray-300 shadow-lg rounded-md py-2 z-20">
          <div className="px-2 pb-2 border-b border-gray-300">
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          <ul className="py-2 border-b border-gray-300">
            {user.role && (
              <li>
                <Link
                  href={`/${user.role.toLowerCase()}`}
                  className="block w-full px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {user.role} Dashboard
                </Link>
              </li>
            )}
          </ul>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
