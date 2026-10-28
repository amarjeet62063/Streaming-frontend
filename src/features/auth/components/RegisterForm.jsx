import { useState } from "react";
import { Button, Loading, Error } from "../../../components/index";
import { useRegister } from "../authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Register() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: registerUser,
    isPending: isLoading,
    error,
  } = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (avatar) data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);

    try {
      const response = await registerUser(data);

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      setMessage(response?.message || "Registration successful!");
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-3 py-8 text-white sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden flex-col justify-center bg-linear-to-br from-emerald-500/20 via-cyan-600/10 to-blue-600/20 p-10 md:flex">
            <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Join Our Community
            </span>

            <h1 className="text-4xl font-bold leading-tight">
              Create your account.
              <span className="mt-2 block text-cyan-400">
                Start your journey.
              </span>
            </h1>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Create your profile and get started with your personalized
              experience.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-7 text-center md:text-left">
              <h2 className="text-2xl font-bold sm:text-3xl">Create Account</h2>
              <p className="mt-2 text-sm text-gray-400">
                Enter your details to register.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="userName"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Profile Picture <span className="text-red-400">*</span>
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                  required
                  className="block w-full min-w-0 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 text-sm text-gray-400 file:mr-3 file:border-0 file:bg-cyan-600 file:px-3 file:py-3 file:font-medium file:text-white hover:file:bg-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="coverImage"
                  className="mb-1.5 block text-sm font-medium text-gray-300"
                >
                  Cover Image <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="block w-full min-w-0 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 text-sm text-gray-400 file:mr-3 file:border-0 file:bg-cyan-600 file:px-3 file:py-3 file:font-medium file:text-white hover:file:bg-cyan-500"
                />
              </div>

              {message && (
                <p
                  role="status"
                  className={`rounded-lg p-3 text-sm ${
                    message.toLowerCase().includes("success")
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}

              {error && !message && <Error error={error} />}

              <div className="pt-2">
                <Button type="submit" disabled={isLoading} className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
