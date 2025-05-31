import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { token, navigate ,user} = useContext(ShopContext);



  // Decode token (assuming it's a JWT and contains name/email)
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      user.name = decoded.name || user.name;
      user.email = decoded.email || user.email;
    } catch (err) {
      console.error("Invalid token format", err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-black mb-1">
        Welcome to your Profile
      </h1>

      <div className="bg-white  rounded-2xl p-2 space-y-2 text-center">
        <div>
          <h2 className="text-4xl font-semibold text-gray-900 mb-2">
            {user.name}
          </h2>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="bg-black text-white text-lg py-3 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;
