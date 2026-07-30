import { useState } from "react";
import Input from "../components/common/Input";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    console.log(form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
        <form onSubmit={handleSubmit}>
          <Input
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
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
