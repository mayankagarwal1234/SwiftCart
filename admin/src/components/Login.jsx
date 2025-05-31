import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({ settoken }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (!res.data.success) {
        toast.error(data.message || "Login failed");
        return;
      } else {
        settoken(res.data.token);
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Panel
        </h1>
        <form onSubmit={onsubmitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
