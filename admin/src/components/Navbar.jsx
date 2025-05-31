import React from 'react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Navbar = ({ settoken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
      <button
        onClick={() => {
          settoken('');
          toast.success("Logout successful!");
        }}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
