import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userroutes.js';
import productRouter from './routes/productroute.js';
import cartrouter from './routes/cartroutes.js';
import orderrouter from './routes/orderroute.js';

// App Configuration
const app = express();
const PORT = process.env.PORT ||4000;
connectDB()
connectCloudinary()

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to SwiftCart Backend ');
});

// Add your routes here
// import userRoutes from './routes/userRoutes.js'
 app.use('/api/user', userRouter)
 app.use('/api/product', productRouter)
 app.use('/api/cart', cartrouter)
 app.use('/api/order',orderrouter)

// Start the Server
//app.listen(PORT, () => {
  //console.log(`✅ Server running at http://localhost:${PORT}`);
//});

export default app;