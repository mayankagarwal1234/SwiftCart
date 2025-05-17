import express from "express";
import { addtocart, updatecart, getusercart } from "../controllers/cartController.js";
import authuser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authuser, getusercart);
cartRouter.post("/add", authuser, addtocart);
cartRouter.post("/update", authuser, updatecart);


export default cartRouter;