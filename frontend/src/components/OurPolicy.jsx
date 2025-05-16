import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-6 text-center py-20 px-4 text-xs sm:text-sm md:text-base text-gray-700">
      {/* Exchange Policy */}
      <div className="max-w-xs">
        <img src={assets.exchange_icon} className="w-12 mx-auto mb-4" alt="Exchange Icon" />
        <p className="font-semibold mb-1">Easy Exchange Policy</p>
        <p className="text-gray-400">
          Shop with confidence – our hassle-free exchange policy has you covered!
        </p>
      </div>

      {/* Return Policy */}
      <div className="max-w-xs">
        <img src={assets.quality_icon} className="w-12 mx-auto mb-4" alt="Return Icon" />
        <p className="font-semibold mb-1">10 Days Return Policy</p>
        <p className="text-gray-400">
          Shop stress-free with our 10-day no-fuss return guarantee.
        </p>
      </div>

      {/* Customer Support */}
      <div className="max-w-xs">
        <img src={assets.support_img} className="w-12 mx-auto mb-4" alt="Support Icon" />
        <p className="font-semibold mb-1">Best Customer Support</p>
        <p className="text-gray-400">
          Got questions? Our expert team is here to help - fast, friendly, and 24/7.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
