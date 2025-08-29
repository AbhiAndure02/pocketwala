import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js"; // ✅ Import Order Routes
import SingleOrderRoutes from "./routes/singleOrder.routes.js"; // ✅ Import Single Order Routes
import path from "path";
import productRoutes from './routes/product.routes.js'; // Adjust the path if needed
import userRoutes from './routes/user.routes.js'


dotenv.config();

const __dirname = path.resolve();
const app = express();

// ✅ Middleware Setup
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// ✅ MongoDB Connection (Make sure to use a database name)
const MONGO_URI =process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/orders", orderRoutes); // ✅ Correct placement for API routes
app.use("/api/order", SingleOrderRoutes); //
app.use("/api/product", productRoutes)
app.use("/api/users", userRoutes);


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
