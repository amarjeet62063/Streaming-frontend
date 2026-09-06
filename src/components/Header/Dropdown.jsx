import { useEffect, useRef, useState } from "react";
import { LogOut, UserCircle, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import { useCurrentUser, useLogout } from "../../features/auth/authHooks";

function AccountDropdown() {
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="rounded-full p-2 transition hover:bg-gray-600"
        aria-label="Account menu"
        aria-expanded={isOpen}
      >
        {isLoading ? (
          <UserCircle size={24} />
        ) : user?.data?.avatar?.url ? (
          <img
            src={user.data.avatar.url}
            alt={user.data.username || "Profile"}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <UserCircle size={24} />
        )}
      </button>

      {/* Dropdown */}

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
          {user ? (
            <>
              {/* User Info */}

              <div className="flex items-center gap-3 p-4">
                {user?.data?.avatar?.url ? (
                  <img
                    src={user.data.avatar.url}
                    alt={user.data.username || "Profile"}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={48} className="text-gray-400" />
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-100">
                    {user?.data?.fullname}
                  </p>

                  <p className="truncate text-sm text-gray-400">
                    @{user?.data?.username}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.data?.email}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-700" />

              {/* Profile */}

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-200 transition hover:bg-gray-800"
              >
                <UserRound size={20} />
                Your profile
              </Link>

              <div className="border-t border-gray-700" />

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-200 transition hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
              >
                <LogOut size={20} />

                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-200 transition hover:bg-gray-800"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-200 transition hover:bg-gray-800"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
