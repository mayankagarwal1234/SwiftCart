import express from "express";
import {placeOrderStripe,placeOrderRazorpay,placeOrderCOD,allorders,updatestatus,userorders, verifystripe, verifyrazorpay } from "../controllers/orderController.js";
import adminauth  from '../middleware/adminauth.js'
import authuser from "../middleware/auth.js";

const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminauth, allorders);
orderRouter.post("/status", adminauth, updatestatus);

//Payment features
orderRouter.post("/place", authuser, placeOrderCOD);
orderRouter.post("/stripe", authuser, placeOrderStripe);
orderRouter.post("/razorpay", authuser, placeOrderRazorpay);

//User features
orderRouter.post("/userorders", authuser, userorders);

//verify payment
orderRouter.post("/verifystripe", authuser, verifystripe);
orderRouter.post("/verifyrazorpay", authuser, verifyrazorpay);


export default orderRouter;
