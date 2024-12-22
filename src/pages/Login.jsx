import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { Link, useNavigate,} from 'react-router-dom';
import googleImg from "../assets/google.png"
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {userLogin, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      userLogin(email, password)
        .then((result) => {
          setUser(result.user);
          toast.success(` Login successful! Welcome back!`);
          navigate(location?.state ? location.state : "/");
        })
        .catch(() => {
          toast.error("Invalid login credentials. Please try again.");
        });
    };


    return (
      <div className="card grid grid-cols-1 md:grid-cols-2 w-full mx-auto max-w-3xl shrink-0 shadow-2xl mt-12 bg-white rounded-none">
        <div className="bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-center">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome To Login
            </h2>
            <p className="text-white font-medium">Don't have an account?</p>
            <button className="py-2 px-6 border border-white text-lg rounded-full mt-4 bg-gradient-to-r from-sky-400 to-sky-500  text-white cursor-pointer font-semibold hover:from-sky-500 hover:to-sky-400 ">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
        <div className="py-6">
          <form onSubmit={handleLogin} className="card-body px-6 py-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Email:</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Password:
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[57px]"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
              <label className="label">
                <Link
                  to="/forget_password"
                  href="#"
                  className="label-text-alt link link-hover text-sm text-gray-600 font-medium"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control">
              <button className="py-2 px-6 text-lg rounded-lg bg-gradient-to-r from-sky-400 to-sky-500   text-white cursor-pointer font-semibold hover:from-sky-500 hover:to-sky-400">
                Log In
              </button>
            </div>
            <div className="">
              <div className="divider">
                <span className="font-medium text-gray-600">OR</span>
              </div>
              <button className="py-2 w-full px-6 text-lg rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-white cursor-pointer font-semibold hover:from-teal-400 hover:to-teal-500">
                <div className="flex items-center justify-center gap-3">
                  <span>Log In with Google</span>
                  <img src={googleImg} className="w-6" alt="" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;