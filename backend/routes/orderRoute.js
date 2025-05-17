import express from "express";
import {
  placeOrderStripe,
  placeOrderRazorpay,
  placeOrderCod,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminauth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment features
orderRouter.post("/place", authUser, placeOrderCod);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User features
orderRouter.post("/userorders", authUser, getUserOrders);

// Verify payment
orderRouter.post("/verifystripe", authUser, verifyStripe);
orderRouter.post("/verifyrazorpay", authUser, verifyRazorpay);

export default orderRouter;
