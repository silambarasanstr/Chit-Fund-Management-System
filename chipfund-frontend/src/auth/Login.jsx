import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import Input from "../components/common/Input";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      navigate("/admin", { replace: true });
    }
  };

  const fillCredentials = (email, password) => {
    setForm({
      email,
      password,
    });

    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-100 via-white to-blue-100">
      <div className="w-full max-w-sm p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
        {/* Header */}
        <div className="mb-5 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-xl text-white bg-blue-600 shadow rounded-xl">
            💰
          </div>

          <h1 className="text-xl font-bold text-gray-800">
            Chit Fund Management
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          {error && (
            <div className="p-2 text-xs text-red-700 border border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Quick Credentials */}
        <div className="pt-4 mt-5 border-t">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Quick Login
            </p>

            <span className="text-[11px] text-gray-400">
              Click to autofill
            </span>
          </div>

          <div className="space-y-2">
            {/* Admin */}
            <button
              type="button"
              onClick={() =>
                fillCredentials("admin@example.com", "123456")
              }
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-2.5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  👨‍💼 Admin
                </p>
                <p className="text-[11px] text-gray-500">
                  admin@example.com
                </p>
              </div>

              <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                USE
              </span>
            </button>

            {/* Member */}
            <button
              type="button"
              onClick={() =>
                fillCredentials("suresh@gmail.com", "123456")
              }
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-2.5 transition hover:border-green-500 hover:bg-green-50"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  👤 Member
                </p>
                <p className="text-[11px] text-gray-500">
                  suresh@gmail.com
                </p>
              </div>

              <span className="rounded bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                USE
              </span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-gray-400">
          © 2026 Chit Fund Management System
        </p>
      </div>
    </div>
  );
}