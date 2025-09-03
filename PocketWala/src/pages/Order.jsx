import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { uploadImageToFirebase } from "../utils/firebaseStorage";
import { useSelector } from "react-redux";

// Assets Imports
import imgage1 from "../assets/left.png";
import imgage2 from "../assets/right.png";
import imgage3 from "../assets/frontA4.png";
import image4 from "../assets/frontA3.png";
import image5 from "../assets/backA4.png";
import image6 from "../assets/backA3.png";

const colorMap = {
  Black: "black",
  White: "white",
  "Navy Blue": "navy",
  "Golden Yellow": "#FFD700",
  Red: "red",
  "Royal Blue": "royalblue",
  Orange: "orange",
  "Light Blue": "lightblue",
  "Light Grey": "lightgrey",
  "Golden Green": "#A8A832",
};

const placements = [
  { name: "Left", img: imgage1 },
  { name: "Right", img: imgage2 },
  { name: "Front A4", img: imgage3 },
  { name: "Front A3", img: image4 },
  { name: "Back A4", img: image5 },
  { name: "Back A3", img: image6 },
];

const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

function Order() {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPlacement, setSelectedPlacement] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/product/${id}`);
        setProduct(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load product. Please try again later.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Toggle placement selection
  const togglePlacement = (placementName) => {
    setSelectedPlacement((prev) =>
      prev.includes(placementName)
        ? prev.filter((p) => p !== placementName)
        : [...prev, placementName]
    );
  };

  // Handle quantity change for color-size combo
  const handleQuantityChange = (color, size, value) => {
    const key = `${color}-${size}`;
    const quantity = Math.max(0, parseInt(value) || 0);

    setQuantities((prev) => {
      const newQuantities = { ...prev, [key]: quantity };

      // Remove entries with 0 quantity for cleanliness
      if (quantity === 0) {
        delete newQuantities[key];
      }

      return newQuantities;
    });
  };

  // Handle file input change for design image upload preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Prepare selected colors and sizes dynamically for display
  const getActiveSelections = () => {
    const activeColors = new Set();
    const activeSizes = new Set();

    Object.keys(quantities).forEach((key) => {
      const [color, size] = key.split("-");
      activeColors.add(color);
      activeSizes.add(size);
    });

    return {
      activeColors: Array.from(activeColors),
      activeSizes: Array.from(activeSizes),
    };
  };

  const { activeColors, activeSizes } = getActiveSelections();

  // Submit order to backend
  const handleSubmit = async () => {
    if (selectedPlacement.length === 0) {
      alert("Please select at least one placement.");
      return;
    }
    if (Object.keys(quantities).length === 0) {
      alert("Please select at least one item quantity.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload image to Firebase if available
      let designImageUrl = null;
      if (imageFile) {
        designImageUrl = await uploadImageToFirebase(imageFile);
      }

      // Build order items (each color-size-quantity per placement)
      const items = [];
      Object.entries(quantities).forEach(([key, quantity]) => {
        const [color, size] = key.split("-");
        selectedPlacement.forEach((placement) => {
          items.push({
            color,
            size,
            quantity,
            price: quantity * 120, // This should ideally come from product price or backend calculation
            placement,
          });
        });
      });

      const orderData = {
        userId: currentUser ? currentUser._id : null,
        items,
        designImage: designImageUrl,
      };

      const response = await axios.post("/api/bulk-order", orderData);

      alert("Order submitted successfully!");
      console.log("Order response:", response.data);

      // Reset form
      setSelectedPlacement([]);
      setQuantities({});
      setUploadedImage(null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Not Found</h1>
        <p className="mb-4 text-gray-600">{error || "The product you are looking for does not exist."}</p>
        <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
      </div>
    );
  }

  // Images fallback
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Custom T-Shirt Designer
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Preview */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-4">
          <img src={images[0]} alt={product.name} className="w-full h-full object-contain" />
          <div className="text-center mt-4">
            <p className="text-gray-600">{product.name}</p>
            <p className="mt-1 text-2xl font-bold text-indigo-700">₹{product.price}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span> Selected Colors
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeColors.length > 0 ? (
                activeColors.map((color) => (
                  <div key={color} className="flex items-center px-2 py-1 bg-indigo-50 rounded-full">
                    <span
                      className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                      style={{ backgroundColor: colorMap[color] }}
                    ></span>
                    <span className="text-xs">{color}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No colors selected</span>
              )}
            </div>

            <h3 className="font-semibold mb-2 flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span> Selected Sizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeSizes.length > 0 ? (
                activeSizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No sizes selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Customization */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-4">
          {/* Placement Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Design Placement (Required)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {placements.map(({ name, img }) => (
                <label
                  key={name}
                  className={`flex flex-col items-center p-2 border rounded-lg cursor-pointer transition-all ${
                    selectedPlacement.includes(name)
                      ? "border-indigo-500 bg-indigo-50 shadow-inner"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <img src={img} alt={name} className="w-16 h-16 object-contain mb-1" />
                  <span className="text-xs font-medium text-center">{name}</span>
                  <input
                    type="checkbox"
                    checked={selectedPlacement.includes(name)}
                    onChange={() => togglePlacement(name)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Design Upload */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Upload Your Design</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center">
              {uploadedImage ? (
                <>
                  <img src={uploadedImage} alt="Design Preview" className="max-h-40 mb-3 rounded" />
                  <button
                    className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Design
                  </button>
                </>
              ) : (
                <button
                  className="text-gray-500 hover:text-indigo-600 flex flex-col items-center"
                  onClick={() => fileInputRef.current.click()}
                >
                  <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Click to upload
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Quantity Selection Table */}
          <div>
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Select Quantities</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="p-2 bg-gray-100 sticky left-0 border border-gray-200">Color \ Size</th>
                    {sizes.map((size) => (
                      <th
                        key={size}
                        className={`p-2 border border-gray-200 ${
                          activeSizes.includes(size) ? "bg-indigo-50" : "bg-gray-100"
                        }`}
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(colorMap).map((color) => (
                    <tr key={color}>
                      <td
                        className={`p-2 sticky left-0 border border-gray-200 ${
                          activeColors.includes(color) ? "bg-indigo-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2 border"
                            style={{ backgroundColor: colorMap[color] }}
                          ></span>
                          <span className="truncate max-w-[80px]">{color}</span>
                        </div>
                      </td>
                      {sizes.map((size) => (
                        <td
                          key={size}
                          className={`p-1 border border-gray-200 ${
                            quantities[`${color}-${size}`] > 0 ? "bg-indigo-50" : ""
                          }`}
                        >
                          <input
                            type="number"
                            min="0"
                            value={quantities[`${color}-${size}`] || 0}
                            onChange={(e) => handleQuantityChange(color, size, e.target.value)}
                            className="w-full p-1 border rounded text-center focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-bold mb-3 text-indigo-800">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Placements:</h3>
            {selectedPlacement.length > 0 ? (
              <ul className="space-y-1">
                {selectedPlacement.map((p) => (
                  <li key={p} className="text-sm">
                    • {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Colors:</h3>
            {activeColors.length > 0 ? (
              <ul className="space-y-1">
                {activeColors.map((c) => (
                  <li key={c} className="text-sm">
                    • {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Sizes:</h3>
            {activeSizes.length > 0 ? (
              <ul className="space-y-1">
                {activeSizes.map((s) => (
                  <li key={s} className="text-sm">
                    • {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            selectedPlacement.length === 0 ||
            activeColors.length === 0 ||
            activeSizes.length === 0
          }
          className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
            isSubmitting ||
            selectedPlacement.length === 0 ||
            activeColors.length === 0 ||
            activeSizes.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Order;
