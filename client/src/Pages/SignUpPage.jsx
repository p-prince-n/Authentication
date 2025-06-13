import { motion} from "framer-motion";
import Input from "../components/Input";
import { User, Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [lock, setLock] = useState(false);

  const handleSubmit = (e) => {e.preventDefault()};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden  "
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text ">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={userData.name}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <Lock className="size-5 text-green-500  " />
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition-all duration-200"
              type={lock ? "password" : "text"}
              placeholder={lock ? "••••••" : "password"}
              value={userData.password}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center pl-3"
              onClick={() => setLock((prev) => !prev)}
            >
              {!lock ? (
                <Eye className="size-5 text-green-500 cursor-pointer  " />
              ) : (
                <EyeOff className="size-5 text-green-500 cursor-pointer " />
              )}
            </button>
          </div>
          <PasswordStrengthMeter password={userData.password}/>
          <motion.button
            className="mt-5 w-full py-3 px-4 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition-all duration-200 "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
        <p className="text-sm text-gray-400 ">Already have an account ? {' '}
            <Link to={'/sign-in'} className="text-green-400 hover:underline ">Login</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
