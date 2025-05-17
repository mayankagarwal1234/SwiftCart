import express from "express";
import {
  listProducts,
  removeProduct,
  getSingleProduct,
  addProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Add product with image uploads (admin only)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Remove product (admin only)
productRouter.post("/remove", adminAuth, removeProduct);

// Get single product info
productRouter.post("/single", getSingleProduct);

// List all products
productRouter.get("/list", listProducts);

export default productRouter;
