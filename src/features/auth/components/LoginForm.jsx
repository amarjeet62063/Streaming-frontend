import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Input, Button } from "../../../components/index";
import { useLogin } from "../authHooks";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const from = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear previous login error when user starts typing
    if (loginMutation.isError) {
      loginMutation.reset();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  const error =
    loginMutation.error?.response?.data?.message || "Unable to login";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-gray-200 p-6 shadow-lg sm:p-8"
    >
      {/* Header */}

      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Sign in to your StreamForge account
        </p>
      </div>

      {/* Error */}

      {loginMutation.isError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* Email */}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      {/* Password */}

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />

      {/* Forgot password */}

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full px-6 py-3 rounded-2xl "
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>

      {/* Register */}

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-green-600 hover:text-green-700"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
