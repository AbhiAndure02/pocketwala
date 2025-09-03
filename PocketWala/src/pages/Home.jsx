import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // ✅ Fix: in your slice it’s `currentUser`
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Fixed: send proper body to backend
  const handleAddToCart = async (product) => {
    try {
      if (!currentUser) {
        alert("Please log in to add items to cart.");
        return;
      }

      const cartData = {
        productId: product._id,
        quantity: 1,
        userId: currentUser._id, // from Redux
      };

      const response = await axios.post("/api/cart/add", cartData);

      // If you want to update global state too
      if (addToCart) {
        await addToCart(response.data);
      }

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Filter products
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.type === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
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
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-10">
      {/* T-Shirt Type Tabs */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our T-Shirt Collections
        </h2>
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl shadow-md">
            {["all", "common", "limited", "premium", "plain", "customize"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {type === "all"
                    ? "All T-Shirts"
                    : `${type.charAt(0).toUpperCase() + type.slice(1)} T-Shirts`}
                </button>
              )
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        product.images[0] ||
                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={product.name}
                      className="w-full h-60 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-blue-600 font-bold">₹{product.price}</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button>
                      <Link to={`/order/${product._id }`}>Bulk Order</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
