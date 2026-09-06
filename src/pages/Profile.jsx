import { Link } from "react-router-dom";
import { UserCircle, Pencil, LogOut } from "lucide-react";

import { useCurrentUser, useLogout } from "../features/auth/authHooks";
import { Loading } from "../components/index";

function Profile() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const logoutMutation = useLogout();

  if (isLoading) {
    return <Loading text="Loading profile..." />;
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile.</p>

          <Link
            to="/login"
            className="mt-3 inline-block font-medium text-green-600 hover:text-green-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] ">
      <div >
        {/* Profile Card */}

        <div className="overflow-hidden l border border-gray-200 bg-white shadow-lg">
          {/* Cover Image */}

          <div className="relative">
            {user?.data?.coverimage?.url && (
              <img
                src={user?.data?.coverimage?.url}
                alt="Cover"
                className="h-48 w-full object-cover"
              />
            )}

            {/* Avatar */}

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              {user?.data?.avatar ? (
                <img
                  src={user?.data?.avatar?.url}
                  alt={user?.data?.username || "Profile"}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="rounded-full border-4 border-white bg-white">
                  <UserCircle
                    size={112}
                    strokeWidth={1.5}
                    className="text-gray-400"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Profile Header */}

          <div className="flex flex-col items-center gap-4 p-6 pt-20 sm:p-8 sm:pt-13">
            {/* User Info */}

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Username:- {user?.data?.username}
              </h1>

              <h1 className="text-2xl font-bold text-gray-900">
                Fullname:- {user?.data?.fullname}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Email:- {user?.data?.email}
              </p>
            </div>
          </div>

          {/* Profile Actions */}

          <div className="border-t border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/profile/edit"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition hover:bg-green-700"
              >
                <Pencil size={18} />
                Edit profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={18} />

                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
