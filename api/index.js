import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import productRoutes from './routes/product.routes.js'; // Adjust the path if needed
import userRoutes from './routes/user.routes.js'
import orderRooutes from './routes/order.routes.js'
import cartRoutes from './routes/cart.routes.js'
import bulkOrderroutes from './routes/bulkOrder.routes.js'
import productTypeRoutes from './routes/productType.routes.js'

dotenv.config();

const __dirname = path.resolve();
const app = express();

// ✅ Middleware Setup
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// ✅ MongoDB Connection (Make sure to use a database name)
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/order', orderRooutes);
app.use('/api/cart', cartRoutes)
app.use('/api/bulk-order', bulkOrderroutes)
app.use('/api', productTypeRoutes)


// ✅ Serve React App (Static Files)
app.use(express.static(path.join(__dirname, "/PocketWala/dist")));

// ✅ Serve React App for any unknown route (after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'PocketWala', 'dist', "index.html"));
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ✅ Start Server
const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
