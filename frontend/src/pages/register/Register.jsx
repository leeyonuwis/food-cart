import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/registerSchema";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      if (data.profilePic?.[0]) {
        formData.append("profilePic", data.profilePic[0]);
      }

      await registerUser(formData);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-lg border px-4 py-2 pr-10 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone number"
              {...register("phone")}
              className="w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("profilePic")}
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium
                         file:bg-green-100 file:text-green-700
                         hover:file:bg-green-200 cursor-pointer"
            />
            {errors.profilePic && (
              <p className="text-red-500 text-sm mt-1">{errors.profilePic.message}</p>
            )}
          </div>

          {/* Button */}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-3/4 px-2 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-60 flex justify-center"
            >
              {isSubmitting ? (
                <Loader className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
