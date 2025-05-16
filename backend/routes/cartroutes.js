import express from "express";
import { addtocart, updatecart, getusercart } from "../controllers/cartcontroller.js";
import authuser from "../middleware/auth.js";

const cartrouter = express.Router();

cartrouter.post("/get", authuser, getusercart);
cartrouter.post("/add", authuser, addtocart);
cartrouter.post("/update", authuser, updatecart);


export default cartrouter;