import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    setshowsearch,
    getcartcount,
    navigate,
    settoken,
    token,
    setcartitems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    settoken("");
    setcartitems({});
    toast.success("Logged out successfully!");
  };

  return (
    <div className="flex items-center justify-between py-3 font-medium">
      <Link to="/">
        <div className="pl-0 px-0">
          <img src={assets.logo} className="w-32" alt="Website Logo" />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="nav-item">HOME</NavLink>
        <NavLink to="/collection" className="nav-item">COLLECTION</NavLink>
        <NavLink to="/about" className="nav-item">ABOUT</NavLink>
        <NavLink to="/contact" className="nav-item">CONTACT</NavLink>
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setshowsearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon with Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && showDropdown && (
            <div className="absolute top-6 right-0 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
              <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getcartcount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full bg-white z-50 transition-all duration-300 transform ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 cursor-pointer border-b"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/contact">CONTACT</NavLink>
          {token && (
            <>
              <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/profile">MY PROFILE</NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-4 pl-6 border-b" to="/orders">ORDERS</NavLink>
              <p onClick={logout} className="py-4 pl-6 border-b cursor-pointer">LOGOUT</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
