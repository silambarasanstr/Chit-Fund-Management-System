import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import * as authService from "../features/auth/authService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await authService.register(form);
      toast.success("Registration successful. You can now log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-100 via-white to-blue-100">
       <div className="w-full max-w-sm p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
       
       <div className="mb-5 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-xl text-white bg-blue-600 shadow rounded-xl">
            💰
          </div>

          <h1 className="text-xl font-bold text-gray-800">
            Chit Fund Management
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Register for a new account
          </p>
        </div>
       
        <form onSubmit={handleSubmit}>
          <Input
            label="First Name"
            name="name"
            placeholder="Enter your first name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
