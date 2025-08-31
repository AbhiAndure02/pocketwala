import Cart from "../models/cart.js";
import Product from "../models/product.model.js"; // assuming you already have Product model

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check if cart exists
    let cart = await Cart.findOne({ userId });

    // get product price from Product model
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (cart) {
      // check if product already in cart
      const itemIndex = cart.items.findIndex((item) => item.productId === productId);

      if (itemIndex > -1) {
        // update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // push new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    }

    // recalc totalPrice
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.productId);
      cart.totalPrice += p.price * item.quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart by user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId"); // optional populate
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId !== productId);

    // recalc total
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.productId);
      cart.totalPrice += p.price * item.quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
