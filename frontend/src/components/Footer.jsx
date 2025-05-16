import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-20 mt-15 text-sm ">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            SwiftCart is a modern, user-friendly e-commerce platform designed to
            make online shopping faster, smarter, and more convenient.SwiftCart
            empowers sellers with advanced analytics, customizable storefronts,
            and secure payment integration. Experience the
            future of digital commerce—swiftly.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-222-456-7990</li>
            <li>contact@SwiftCart.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          COPYRIGHT 2025@SwiftCart.com -All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
