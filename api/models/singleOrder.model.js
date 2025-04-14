import mongoose from "mongoose";

const singleOrderSchema = new mongoose.Schema({
    size:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    placement:{
        type: Array,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});
const SingleOrder = mongoose.model("SingleOrder", singleOrderSchema);
export default SingleOrder;