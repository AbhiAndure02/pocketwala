import React, { useState, useRef } from "react";
import axios from "axios"; // Import Axios
import img from "../assets/vithu.jpeg";
import imgage1 from "../assets/left.png";
import imgage2 from "../assets/right.png";
import imgage3 from "../assets/frontA4.png";
import image4 from "../assets/frontA3.png";
import image5 from "../assets/backA4.png";
import image6 from "../assets/backA3.png";
import { Link } from "react-router-dom";

function Order() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

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
    { name: "Front A-4 Size", img: imgage3 },
    { name: "Front A+ Size", img: image4 },
    { name: "Back A Size", img: image5 },
    { name: "Back A+ Size", img: image6 },
  ];

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  // Toggle selection functions
  const toggleSelection = (item, state, setState) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Update quantity for selected Placement + Size + Color
  const updateQuantity = (placement, size, color, value) => {
    const key = `${placement}-${size}-${color}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + value),
    }));
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // 🟢 Prepare Data & Send to Backend
  const handleSubmit = async () => {
    const items = [];

    selectedPlacement.forEach((placement) => {
      selectedSizes.forEach((size) => {
        selectedColors.forEach((color) => {
          const key = `${placement}-${size}-${color}`;
          const quantity = quantities[key] || 0;

          if (quantity > 0) {
            items.push({
              placement,
              size,
              color,
              quantity,
              price: quantity*120, // Fixed price (you can calculate dynamically)
            });
          }
        });
      });
    });

    // 🟢 Send Data to Backend
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        items,
      });

      alert("Order Submitted Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 p-6">
      {/* Left Section (Product Image, Size & Color Selection) */}
      <div className="lg:w-1/2">
      <Link to="/admin">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
          Go to Admin
        </button>
      </Link>
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Polyester Dryfit T-Shirt</h2>

          <div className="flex flex-col lg:flex-row gap-12 mt-6">
            {/* Product Image */}
            <div className="flex flex-col items-center">
              <img
                src={uploadedImage || img}
                alt="T-shirt"
                className="w-full max-w-md h-auto border rounded-md"
              />
              <p className="text-lg font-semibold mt-4">
                Price: <span className="text-3xl font-bold text-blue-900">₹120</span>
              </p>
              <p className="line-through text-gray-500">₹240</p>
            </div>

            {/* Size & Color Selection */}
            <div className="w-full">
              <p className="text-xl font-semibold">Magic Dryplay - Premium Round Neck</p>
              <p className="text-gray-600">Reliance Micro Fabric - 180 GSM</p>

              {/* Size Selection */}
              <div className="mt-6">
                <p className="font-semibold">Select Sizes:</p>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                      className={`px-3 py-2 border rounded-md ${
                        selectedSizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-100"
                      } transition duration-300`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-6">
                <p className="font-semibold">Select Colors:</p>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {Object.keys(colorMap).map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleSelection(color, selectedColors, setSelectedColors)}
                      className={`w-12 h-12 border rounded-full ${
                        selectedColors.includes(color) ? "border-4 border-yellow-500" : ""
                      }`}
                      style={{ backgroundColor: colorMap[color] }}
                    ></button>
                  ))}
                </div>
                <div className="mt-6">
  <p className="font-semibold">Upload Your Design:</p>
  <div className="flex items-center gap-3 mt-3 border p-3 rounded-md">
    {/* Upload Design Button */}
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={() => fileInputRef.current.click()}
    >
      Upload your design
    </button>

    {/* Hidden Input Field */}
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      className="hidden"
      onChange={handleFileChange}
    />

    {/* Preview Uploaded Image */}
    {uploadedImage && (
      <img
        src={uploadedImage}
        alt="Uploaded Design"
        className="w-12 h-12 rounded-md"
      />
    )}
  </div>
</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Right Section (Placement Selection & Quantity) */}
      <div className="lg:w-1/2">
        <div className="p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center">Select Placement</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {placements.map(({ name, img }) => (
              <label key={name} className="flex flex-col items-center p-3 border rounded-lg shadow-md cursor-pointer">
                <img src={img} alt={name} className="w-32 h-32 rounded-md" />
                <input
                  type="checkbox"
                  checked={selectedPlacement.includes(name)}
                  onChange={() => toggleSelection(name, selectedPlacement, setSelectedPlacement)}
                  className="mt-2"
                />
                <span className="mt-2 font-semibold">{name}</span>
              </label>
            ))}
          </div>

          {/* Quantity Selection */}
          <h2 className="text-2xl font-bold mt-8 text-center">Select Quantity</h2>
          <div className="grid gap-4 mt-4">
            {selectedPlacement.map((placement) =>
              selectedSizes.map((size) =>
                selectedColors.map((color) => (
                  <div key={`${placement}-${size}-${color}`} className="flex items-center justify-between border p-3 rounded-md">
                    <span className="font-bold">{placement} - {size} - {color}</span>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border rounded-md" onClick={() => updateQuantity(placement, size, color, -1)}>-</button>
                      <span>{quantities[`${placement}-${size}-${color}`] || 0}</span>
                      <button className="px-3 py-1 border rounded-md" onClick={() => updateQuantity(placement, size, color, 1)}>+</button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          <button onClick={handleSubmit} className="text-white bg-blue-600 text-2xl w-full p-2 mt-4 rounded-2xl">
            Submit Bulk Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
