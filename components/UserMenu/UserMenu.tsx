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
    <div className="relative flex items-center gap-3 z-50" data-testid="user-menu-container">
      <div
        className="w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer flex justify-center items-center"
        data-testid="user-avatar-wrapper"
      >
        <Image
          src={"/img/Unknown_person.jpg"}
          alt="user logo"
          width={40}
          height={40}
          onClick={() => setShowUserDetails(!showUserDetails)}
          data-testid="user-avatar"
        />
      </div>

      {showUserDetails && (
        <div
          className="absolute border-1 border-gray-300 shadow-lg top-12 right-0 py-2 rounded-md w-60 bg-white"
          data-testid="user-dropdown"
        >
          <div className="pb-2 border-b-1 border-gray-300 px-2" data-testid="user-email-container">
            <div className="text-sm text-[#6b7280]" data-testid="user-email">{user.email}</div>
          </div>

          <ul className="py-2 border-b-1 border-gray-300" data-testid="user-role-list">
            {user.role ? (
              <li className="hover:bg-[#f3f4f6]" data-testid="user-role-item">
                <Link
                  href={`/${user.role.toLowerCase()}`}
                  className="p-2 text-[#6b7280] block w-full"
                  data-testid="user-role-link"
                >
                  {user.role} Dashboard
                </Link>
              </li>
            ) : null}
          </ul>

          <button
            onClick={handleLogout}
            className="text-left p-2 text-[#6b7280] block w-full hover:bg-[#f3f4f6]"
            data-testid="logout-button"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
