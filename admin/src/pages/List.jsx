import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      toast.error("Error fetching product list");
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchList(); // refresh the list
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">All Products List</h2>

      <div className="flex flex-col gap-2">
        {/* Table Headings */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border px-4 py-3 rounded-md shadow-sm hover:bg-gray-50 transition-all duration-150 gap-2"
            >
              {/* Image */}
              <div>
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-12 h-16 object-cover rounded-md border"
                />
              </div>

              {/* Name */}
              <div className="text-sm font-medium text-gray-800">{item.name}</div>

              {/* Category */}
              <div className="text-sm text-gray-600">{item.category}</div>

              {/* Price */}
              <div className="text-sm font-semibold text-gray-700">
                {currency}
                {item.price}
              </div>

              {/* Action */}
              <div className="text-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">No products found.</div>
        )}
      </div>
    </>
  );
};

export default List;
