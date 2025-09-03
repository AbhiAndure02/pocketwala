import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    placement: {
      type: String,
      enum: ["Left", "Right", "Front A4", "Front A3", "Back A4", "Back A3"],
      required: true,
    },
  },
  { _id: false }
);

const bulkOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false, // can be guest order too
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    designImage: {
      type: String, // store image URL or base64 string
      required: false,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Pre-save hook to auto-calc totalPrice
bulkOrderSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
  next();
});

const OrdeBulk = mongoose.model("Order-Bulk", bulkOrderSchema);

export default OrdeBulk;