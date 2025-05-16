import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { backendUrl, navigate, token, setcartitems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifypayment = async () => {
    if (!orderId || !success || !token) {
      setStatus("error");
      return null;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { orderId, success, userId: localStorage.getItem("userId") },
        { headers: { token } }
      );

      if (res.data.success) {
        setcartitems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifypayment();
  }, [token]);

  return (
    <div>

        
    </div>
  );
};

export default Verify;
