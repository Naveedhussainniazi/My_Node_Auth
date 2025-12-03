import { useForm } from "react-hook-form";
import { useContext } from "react";
import { webData } from "../context/UserContext";
import { API } from "../utils/Api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setUser } = useContext(webData);
  const navigate = useNavigate();

  // ======================
  // SIGNUP FORM HANDLER
  // ======================
  const formHandler = async (formData) => {
    try {
      const { data } = await API({
        url: "/auth/registration",
        method: "post",
        data: formData,
      });

      // Save token
      localStorage.setItem("token", data.accessToken);

      // Save user to context
      setUser(data.user);

      console.log("Signup successful:", data);

      // Navigate to home or dashboard
      navigate("/login");

      // Reset form
      reset();

    } catch (err) {
      console.log("Signup failed:", err?.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-green-400/50">
        <h2 className="text-2xl font-semibold text-blue-100 text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(formHandler)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-blue-100 text-sm ml-1">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full p-3 mt-1 rounded-lg bg-transparent border border-green-400 text-blue-100 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-blue-100 text-sm ml-1">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full p-3 mt-1 rounded-lg bg-transparent border border-green-400 text-blue-100 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-blue-100 text-sm ml-1">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="w-full p-3 mt-1 rounded-lg bg-transparent border border-green-400 text-blue-100 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-green-500 text-black font-medium hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-blue-100 text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
