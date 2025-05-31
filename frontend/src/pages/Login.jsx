import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [currentstate, updatecurrentstate] = useState("Login");
  const { token, settoken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (currentstate === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          const userToken = response.data.token;
          settoken(userToken);
          localStorage.setItem("token", userToken);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (res.data.success) {
          const userToken = res.data.token;
          settoken(userToken);
          localStorage.setItem("token", userToken);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      }
    } catch (error) {
      toast.error(
        error.res?.data?.message || error.message || "Error occurred"
      );
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })

  const toggleState = () => {
    updatecurrentstate((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-4 mt-10">
        <p className="text-3xl prata-regular">{currentstate}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentstate === "Sign Up" && (
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-800  px-3 py-2 "
          required
        />
      )}

      <input
        onChange={(e) => setemail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        className="w-full border border-gray-800 rounded px-3 py-2 "
        required
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className="w-full border border-gray-800 rounded px-3 py-2 "
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <u>
          <p className="cursor-pointer">Forgot Password</p>
        </u>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition duration-200"
      >
        {currentstate}
      </button>

      <p className="text-sm text-gray-600 mt-2">
        {currentstate === "Sign Up"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <span
          onClick={toggleState}
          className="text-black font-semibold cursor-pointer underline hover:text-gray-800"
        >
          {currentstate === "Sign Up" ? "Login" : "Sign Up"}
        </span>
      </p>
    </form>
  );
};

export default Login;
