import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Add your subscription logic here
  };

  return (
    <div className="text-center px-4 py-4">
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe now and get 10% off
      </p>
      <p className="text-gray-500 mt-3">
      Get insider access. Tips, deals & more—just one email away!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md mx-auto my-6 flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden"
      >
        <input
          className="w-full px-4 py-3 text-sm outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-sm font-medium px-6 py-3"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
