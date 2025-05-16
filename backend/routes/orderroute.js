import express from "express";
import {placeOrderStripe,placeOrderRazorpay,placeOrderCOD,allorders,updatestatus,userorders, verifystripe, verifyrazorpay } from "../controllers/ordercontroller.js";
import adminauth  from '../middleware/adminauth.js'
import authuser from "../middleware/auth.js";

const orderrouter = express.Router();

//Admin features
orderrouter.post("/list", adminauth, allorders);
orderrouter.post("/status", adminauth, updatestatus);

//Payment features
orderrouter.post("/place", authuser, placeOrderCOD);
orderrouter.post("/stripe", authuser, placeOrderStripe);
orderrouter.post("/razorpay", authuser, placeOrderRazorpay);

//User features
orderrouter.post("/userorders", authuser, userorders);

//verify payment
orderrouter.post("/verifystripe", authuser, verifystripe);
orderrouter.post("/verifyrazorpay", authuser, verifyrazorpay);


export default orderrouter;