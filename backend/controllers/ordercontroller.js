import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe"
import razorpay from "razorpay"


//global variables
const currency = 'inr'
const deliveryCharge = 50;


//Getway Initalize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//Placing order using Cod method  
export const placeOrderCOD = async (req, res) => {

  try {
    const { userId, items, amount, address } = req.body;

    const orderdata = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderdata)

    await newOrder.save();

    // Clear cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    res.status(201).json({ success: true, message: "Order placed successfully with COD" });
  } catch (err) {
    console.error("COD Order Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};


//Placing order using stripe method  
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let finalAmount = amount;

    const threshold = 3000;
    const shouldAddDelivery = amount < threshold;

    // Add delivery charge if below threshold
    if (shouldAddDelivery) {
      finalAmount += deliveryCharge;
    }

    // Create order in DB with pending payment
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();

    // Prepare line items for Stripe checkout
    const line_items = items.map(item => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as separate item if needed
    if (shouldAddDelivery) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: deliveryCharge * 100, // Convert to cents
        },
        quantity: 1,
      });
    }


    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Stripe session created successfully",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.status(500).json({ success: false, message: "Server error while placing order via Stripe" });
  }
};


// Verify Stripe

export const verifystripe = async (req, res) => {
  const { orderId, success, userId } = req.body
  try {

    if (!orderId || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (success === "true") {
      // Mark payment as complete in DB
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, { cartdata: {} });

      res.status(200).json({
        success: true,
        message: "Payment verified and order confirmed",
      });
    } else {
      // Optionally delete failed order
      await orderModel.findByIdAndDelete(orderId);

      res.status(200).json({
        success: false,
        message: "Payment failed or cancelled. Order deleted.",
      });
    }
  } catch (error) {
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
}


//Placing order using Razorpay method  
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create order in DB with pending payment
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error })
      }
      res.status(200).json({
        success: true,
        message: "Razorpay order created successfully",
        order,
      });
    });


  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while placing order via Razorpay",
    });
  }
}


//verify razorpay
export const verifyrazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    if (!razorpay_order_id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Fetch order from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Extract our internal order ID from Razorpay's receipt field
    const dbOrderId = orderInfo?.receipt;

    if (!dbOrderId) {
      return res.status(404).json({
        success: false,
        message: "Order ID (receipt) not found in Razorpay order.",
      });
    }

    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(dbOrderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartdata: {} });

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Payment not completed yet.",
      });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during Razorpay verification",
    });
  }
};

//All orders data for admin panel

export const allorders = async (req, res) => {
  try {
    // Fetch orders from DB
    const orders = await orderModel.find({})

    // Respond with order data
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("All Orders Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//Users orders data for frontend

export const userorders = async (req, res) => {

  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("User Orders Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }


}



//Update orders status


export const updatestatus = async (req, res) => {

  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ success: false, message: "Server error while updating status." });
  }
};
