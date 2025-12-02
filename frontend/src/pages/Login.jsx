import { useForm } from "react-hook-form";
import { useContext } from "react";
import { webData } from "../context/UserContext";
import { API } from "../utils/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  // ✔ Correct way
  const { user, setUser } = useContext(webData);

  const navigate = useNavigate();

  const formHandler = async (formData) => {
    console.log(formData);
    try {
      let { data } = await API({
        url: "/auth/login",
        method: "post",
        data: formData
      });

      localStorage.setItem("token", data.accessToken);

      setUser(data.user); // ✔ now it works

      navigate("/deshboard");
      reset();
    } catch (err) {
      console.log("Wrong credentials");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-green-400/50">
        <h2 className="text-2xl font-semibold text-blue-100 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(formHandler)} className="space-y-4">
          <div>
            <label className="text-blue-100 text-sm ml-1">Email</label>
            <input {...register('email')}
              type="email"
              className="w-full p-3 mt-1 rounded-lg bg-transparent border border-green-400 text-blue-100 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-blue-100 text-sm ml-1">Password</label>
            <input {...register('password')}
              type="password"
              className="w-full p-3 mt-1 rounded-lg bg-transparent border border-green-400 text-blue-100 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-green-500 text-black font-medium hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-blue-100 text-center text-sm mt-6">
          Don't have an account?{" "}
          <span className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
            >
             Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
