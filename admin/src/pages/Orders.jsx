import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setorders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const statushandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated.");
      }
    } catch (error) {
      console.error("Failed to change status of the order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">🧾 Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel"
                    className="w-6 h-6"
                  />
                  <p className="font-semibold text-gray-700">
                    Order #{order._id?.slice(-5)}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              {/* Items List */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b py-1">
                      <p>
                        {item.name} x {item.quantity}
                      </p>
                      <span className="text-gray-500">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Address */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Customer:</h4>
                <p className="text-gray-800">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {order.address?.street}
                </p>
                <p className="text-sm text-gray-600">
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country} - {order.address?.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  📞 {order.address?.phone}
                </p>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                <p>
                  <strong>Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.payment ? "✅ Done" : "❌ Pending"}
                </p>
                <p>
                  <strong>Total:</strong> {currency}
                  {order.amount}
                </p>
              </div>

              {/* Order Status */}
              <div className="mt-2">
                <label
                  htmlFor={`status-${order._id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Order Status
                </label>
                <select
                  onChange={(e) => statushandler(e, order._id)}
                  value={order.status}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
