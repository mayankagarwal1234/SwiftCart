import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}



//Route for user login
export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ sucess: false, msg: "User doesn't exists" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }
    else {

      // Generate token
      const token = createtoken(user._id)
      res.json({ success: true, token })
    }

  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error", error: error.message });
  }

}


//Route for user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // Check for existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, msg: "User already exists" });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, msg: "Please enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createtoken(user._id)
    res.json({ success: true, token })

  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error", error: error.message });
  }
}


//Route for Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, message: "Login successful", token })

    }
    else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
