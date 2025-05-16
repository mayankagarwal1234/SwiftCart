import userModel from "../models/usermodel.js";

// Add products to user cart
export const addtocart = async (req, res) => {
  try {
    const { userId, size, itemId } = req.body;

    const userdata = await userModel.findById(userId);
    if (!userdata) return res.status(404).json({ success: false, message: "User not found" });

    let cartdata = await userdata.cartdata || {};

    if (cartdata[itemId]) {
      if (cartdata[itemId][size]) {
        cartdata[itemId][size] += 1;
      } else {
        cartdata[itemId][size] = 1;
      }
    } else {
      cartdata[itemId] = {};
      cartdata[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId,{cartdata})

    res.status(200).json({ success: true, message: "Added to cart", cartdata });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update user cart
export const updatecart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userdata = await userModel.findById(userId);
    if (!userdata) return res.status(404).json({ success: false, message: "User not found" });

    let cartdata = await userdata.cartdata || {};

    if (!cartdata[itemId]) {
      cartdata[itemId] = {};
    }
    cartdata[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId,{cartdata})

    res.status(200).json({ success: true, message: "Cart updated", cartdata });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user cart data
export const getusercart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userdata = await userModel.findById(userId);
    if (!userdata) return res.status(404).json({ success: false, message: "User not found" });

    const cartdata = await userdata.cartdata || {};

    res.status(200).json({ success: true, cartdata});

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
