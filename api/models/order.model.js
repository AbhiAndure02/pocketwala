import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   
    items: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            placement: { type: String, required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
