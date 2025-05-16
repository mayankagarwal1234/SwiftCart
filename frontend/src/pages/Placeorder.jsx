import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const {
    navigate,
    backendUrl,
    token,
    cartitems,
    setcartitems,
    getcartamount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformdata((data) => ({ ...data, [name]: value }));
  };

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          // Send Razorpay payment info + userId to backend for verification
          const verifyResponse = await axios.post(
            `${backendUrl}/api/order/verifyrazorpay`,
            {
              userId: localStorage.getItem("userId"),
              razorpay_order_id: response.razorpay_order_id,
            },
            { headers: { token } }
          );

          if (verifyResponse.data.success) {
            toast.success("Payment verified and order confirmed!");
            navigate("/orders");
            setcartitems({});
          } else {
            toast.error(
              verifyResponse.data.message || "Payment verification failed."
            );
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Something went wrong while verifying payment.");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSelect = (method) => {
    setPaymentMethod(method);
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    try {
      let orderitems = [];

      for (const itemId in cartitems) {
        for (const size in cartitems[itemId]) {
          if (cartitems[itemId][size] > 0) {
            const iteminfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (iteminfo) {
              iteminfo.size = size;
              iteminfo.quantity = cartitems[itemId][size];
              orderitems.push(iteminfo);
            }
          }
        }
      }

      const orderdata = {
        address: formdata,
        items: orderitems,
        amount:
          getcartamount() < 3000
            ? getcartamount() + delivery_fee
            : getcartamount(),
        payment: paymentMethod,
      };

      switch (paymentMethod) {
        case "cod":
          const codRes = await axios.post(
            `${backendUrl}/api/order/place`,
            orderdata,
            { headers: { token } }
          );
          if (codRes.data.success) {
            toast.success("Order placed successfully!");
            setcartitems({});
            navigate("/orders");
          } else {
            toast.error(codRes.data.message || "Order failed.");
          }
          break;

        case "stripe":
          const stripeRes = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderdata,
            { headers: { token } }
          );
          if (stripeRes.data.success) {
            const { session_url } = stripeRes.data;
            window.location.replace(session_url);
          } else {
            toast.error("Stripe session failed.");
          }
          break;

        case "razorpay":
          {
            const razorRes = await axios.post(
              `${backendUrl}/api/order/razorpay`,
              orderdata,
              { headers: { token } }
            );
            if (razorRes.data.success) {
              initpay(razorRes.data.order);
            } else {
              toast.error("Razorpay session failed.");
            }
          }
          break;

        default:
          toast.error("Invalid payment method selected.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10"
    >
      {/* Delivery Info (Left Side) */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY "} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formdata.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="input"
          />
          <input
            required
            name="lastName"
            value={formdata.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="input"
          />
        </div>

        <input
          required
          name="email"
          type="email"
          value={formdata.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="input"
        />
        <input
          required
          name="street"
          value={formdata.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="input"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formdata.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="input"
          />
          <input
            required
            name="state"
            value={formdata.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="input"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="pincode"
            type="number"
            value={formdata.pincode}
            onChange={onChangeHandler}
            placeholder="Pin Code"
            className="input"
          />
          <input
            required
            name="country"
            value={formdata.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="input"
          />
        </div>

        <input
          required
          name="phone"
          type="tel"
          value={formdata.phone}
          onChange={onChangeHandler}
          placeholder="Phone Number"
          className="input"
        />
      </div>

      {/* Order Summary & Payment Method (Right Side) */}
      <div className="mt-8 w-full sm:w-[400px]">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT "} text2={"METHOD"} />
          <div className="flex gap-3 flex-col">
            {/* Stripe */}
            <PaymentOption
              selected={paymentMethod === "stripe"}
              onClick={() => handleSelect("stripe")}
              logo={assets.stripe_logo}
              label="Stripe"
            />
            {/* Razorpay */}
            <PaymentOption
              selected={paymentMethod === "razorpay"}
              onClick={() => handleSelect("razorpay")}
              logo={assets.razorpay_logo}
              label="Razorpay"
            />
            {/* Cash on Delivery */}
            <PaymentOption
              selected={paymentMethod === "cod"}
              onClick={() => handleSelect("cod")}
              label="CASH ON DELIVERY"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full border border-black bg-black text-white py-3 text-sm rounded"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// ✅ Helper component for payment options
const PaymentOption = ({ selected, onClick, logo, label }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
      selected ? "border-black bg-green-200" : "border-gray-300"
    }`}
  >
    <div className="w-4 h-4 border rounded-full flex items-center justify-center">
      {selected && <div className="w-2 h-2 bg-black rounded-full" />}
    </div>
    {logo ? (
      <img src={logo} className="h-5 mx-4" alt={label} />
    ) : (
      <p className="text-gray-600 text-sm font-medium mx-4">{label}</p>
    )}
  </div>
);

export default Placeorder;
