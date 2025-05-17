import { v2 as cloudinary } from 'cloudinary'
import productModel from "../models/productModel.js";

//Add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price,category, subCategory, sizes, bestseller } = req.body;

        // Check if all required fields are present
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        );

        const productdata = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller==="true"? true:false,
            date: Date.now()
        }
        const newProduct = new productModel(productdata)

        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error", details: error.message });
    }

}
//Remove product
export const removeProduct = async (req, res) => {

    try {
    
        const deletedProduct = await productModel.findByIdAndDelete(req.body.id);
        if (!deletedProduct) {
          return res.status(404).json({success:false, error: "Product not found" });
        } 
    
        res.status(200).json({  success:true, message: "Product deleted successfully", product: deletedProduct });
      } catch (error) {
        res.status(500).json({ success:false, error: "Internal Server Error", details: error.message });
      }

}
//List product
export const listProduct = async (req, res) => {

    try {
        const products = await productModel.find().sort({ date: -1 }); // latest first
        res.status(200).json({success:true ,products});
      } catch (error) {
        res.status(500).json({success:false, error: "Internal Server Error", details: error.message });
      }

}
// single product info
export const singleProduct = async (req, res) => {

  try {
    const { productid } = req.body;

    const product = await productModel.findById(productid);
    if (!product) {
      return res.status(404).json({ success:false, error: "Product not found" });
    }
    res.status(200).json({success:true,product});
  } catch (error) {
    res.status(500).json({ success:false, error: "Internal Server Error", details: error.message });
  }

}