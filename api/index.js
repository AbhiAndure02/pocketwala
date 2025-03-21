import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());  // ✅ FIX for handling JSON requests

app.use("/api/orders", orderRoutes);
mongoose.connect("mongodb+srv://abhiandure123:abhishek@cluster0.oxo6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
