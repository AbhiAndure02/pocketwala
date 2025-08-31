import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart/${currentUser._id}`);
        setCart(res.data);
        
        // Fetch product details for each item in cart
        const productDetails = {};
        for (const item of res.data.items) {
          try {
            const productRes = await axios.get(`/api/product/${item.productId}`);
            productDetails[item.productId] = productRes.data;
          } catch (err) {
            console.error(`Error fetching product ${item.productId}:`, err);
            productDetails[item.productId] = { 
              name: "Product not available", 
              price: 0,
              images: []
            };
          }
        }
        setProducts(productDetails);
      } catch (err) {
        setError("Failed to load cart");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser && currentUser._id) {
      fetchCart();
    }
  }, [currentUser]);

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      const res = await axios.put(`/api/cart/${currentUser._id}`, {
        productId,
        quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.error("Error updating quantity", err);
      alert("Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${cart._id}/${productId}`);
      setCart(res.data);
      
      // Remove product from local state
      const updatedProducts = { ...products };
      delete updatedProducts[productId];
      setProducts(updatedProducts);
    } catch (err) {
      console.error("Error removing item", err);
      alert("Failed to remove item");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your cart...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!cart || cart.items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Shopping Cart</h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {cart.items.map((item) => {
            const product = products[item.productId];
            return (
              <div
                key={item.productId}
                className="flex flex-col md:flex-row justify-between items-center p-6 border-b last:border-b-0"
              >
                {/* Product Info with Image */}
                <div className="flex items-center space-x-4 mb-4 md:mb-0 flex-1">
                  <img
                    src={product.images && product.images[0] 
                      ? product.images[0] 
                      : "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <Link 
                      to={`/product/${item.productId}`}
                      className="font-semibold text-lg hover:text-blue-600"
                    >
                      {product.name || "Unknown Product"}
                    </Link>
                    <p className="text-blue-600 font-bold">₹{product.price || 0}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium">{item.quantity}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Item Total and Remove Button */}
                <div className="flex flex-col items-end space-y-2">
                  <p className="font-bold text-lg">
                    ₹{(product.price || 0) * item.quantity}
                  </p>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cart.totalPrice || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{cart.totalPrice > 999 ? 0 : 99}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-blue-600">
                ₹{cart.totalPrice + (cart.totalPrice > 999 ? 0 : 99)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            Proceed to Checkout
          </button>
          
          <div className="text-center mt-4">
            <Link 
              to="/"
              className="text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;