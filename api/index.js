import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js"; // ✅ Import Order Routes
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const app = express();

// ✅ Middleware Setup
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// ✅ MongoDB Connection (Make sure to use a database name)
const MONGO_URI ="mongodb+srv://abhiandure123:abhishek@cluster0.oxo6h.mongodb.net/pocketwala?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/orders", orderRoutes); // ✅ Correct placement for API routes

// ✅ Serve React App (Static Files)
const distPath = path.join(__dirname, "/PocketWala/dist");
app.use(express.static(distPath));

// ✅ Serve React App for any unknown route (after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
