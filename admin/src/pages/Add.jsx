import React, { useState, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);
      formdata.append("bestseller", isBestseller);
      formdata.append("sizes", JSON.stringify(selectedSizes));

      if (image1) formdata.append("image1", image1);
      if (image2) formdata.append("image2", image2);
      if (image3) formdata.append("image3", image3);
      if (image4) formdata.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formdata,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!");
        setname("");
        setdescription("");
        setprice("");
        setcategory("");
        setsubCategory("");
        setSelectedSizes([]);
        setIsBestseller(false);
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);

        // Reset file inputs
        if (image1Ref.current) image1Ref.current.value = "";
        if (image2Ref.current) image2Ref.current.value = "";
        if (image3Ref.current) image3Ref.current.value = "";
        if (image4Ref.current) image4Ref.current.value = "";
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl space-y-8"
    >
      {/* Image Upload Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => {
            const image = eval(`image${num}`);
            const setImage = eval(`setimage${num}`);
            const ref = eval(`image${num}Ref`);
            return (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-black cursor-pointer transition-all duration-200 flex items-center justify-center aspect-square bg-gray-100 overflow-hidden"
              >
                {!image && (
                  <img
                    src={assets.upload_area}
                    alt="Upload"
                    className="h-16 w-16 opacity-70 z-10"
                  />
                )}
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                )}
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={`image${num}`}
                  ref={ref}
                  hidden
                />
              </label>
            );
          })}
        </div>
        <p className="text-sm text-gray-500 mt-2">Upload up to 4 product images.</p>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Price (₹)</label>
          <input
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            type="number"
            placeholder="1000"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Category</label>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Subcategory</label>
          <select
            value={subCategory}
            onChange={(e) => setsubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select subcategory</option>
            <option value="Topwear">TopWear</option>
            <option value="Bottomwear">BottomWear</option>
            <option value="Winterwear">WinterWear</option>
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-lg font-semibold text-gray-800 mb-2">Available Sizes</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 rounded-lg border ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          rows="4"
          placeholder="Write about the product here..."
          required
        />
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={isBestseller}
          onChange={(e) => setIsBestseller(e.target.checked)}
          className="h-4 w-4 text-black border-gray-300 rounded"
        />
        <label htmlFor="bestseller" className="text-gray-700 text-sm">
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
