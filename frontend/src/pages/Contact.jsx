import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div >
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT '} text2={' US'} />
      </div>


      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" /> 
      <div className=" px-6 flex flex-col justify-center items-start gap-6 ">
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p className='text-gray-500'>Swift Cart House<br />123 Market Street, Bhagalpur 812001</p>
        <p className='text-gray-500'>Tel: +91 (234) 567-8901 <br />Email: support@swiftcart.com</p>
        <p className='font-semibold text-xl text-gray-600'>Carrers at SwiftCart</p>
        <p className='text-gray-500'>Learn more about our team and job openings</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Exlpore Jobs</button>
      </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
