import React, { useState, useRef } from "react";
import axios from "axios";

// Assets
import img from "../assets/vithu.jpeg";
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
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const getActiveSelections = () => {
    const activeColors = new Set();
    const activeSizes = new Set();
    
    Object.keys(quantities).forEach(key => {
      const [color, size] = key.split('-');
      if (quantities[key] > 0) {
        activeColors.add(color);
        activeSizes.add(size);
      }
    });
    
    return {
      activeColors: Array.from(activeColors),
      activeSizes: Array.from(activeSizes)
    };
  };

  const { activeColors, activeSizes } = getActiveSelections();

  const toggleSelection = (item, state, setState) => {
    setState(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleQuantityChange = (color, size, value) => {
    const key = `${color}-${size}`;
    const quantity = Math.max(0, parseInt(value) || 0);
    
    setQuantities(prev => ({ ...prev, [key]: quantity }));

    if (quantity > 0) {
      if (!selectedColors.includes(color)) setSelectedColors(prev => [...prev, color]);
      if (!selectedSizes.includes(size)) setSelectedSizes(prev => [...prev, size]);
    } else {
      const hasColorQuantities = Object.keys(quantities).some(k => k.startsWith(`${color}-`) && quantities[k] > 0);
      const hasSizeQuantities = Object.keys(quantities).some(k => k.endsWith(`-${size}`) && quantities[k] > 0);
      
      if (!hasColorQuantities) setSelectedColors(prev => prev.filter(c => c !== color));
      if (!hasSizeQuantities) setSelectedSizes(prev => prev.filter(s => s !== size));
    }
  };

  const handleSubmit = async () => {
    if (selectedPlacement.length === 0) return alert("Please select at least one placement");

    const items = [];
    Object.keys(colorMap).forEach(color => {
      sizes.forEach(size => {
        const quantity = quantities[`${color}-${size}`] || 0;
        if (quantity > 0) {
          selectedPlacement.forEach(placement => {
            items.push({
              placement,
              size,
              color,
              quantity,
              price: quantity * 120,
              design: uploadedImage,
            });
          });
        }
      });
    });

    if (items.length === 0) return alert("Please select at least one item with quantity > 0");

    try {
      await axios.post("/api/orders", { items });
      alert("Order Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-800">Custom T-Shirt Designer</h1>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Product */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-4">
  <div className="flex flex-col items-center">
    <img src={img} alt="T-shirt" className="w-64 h-auto rounded-lg mb-4" />

    <div className="text-center mb-4">
      <h2 className="text-xl font-bold">Premium Dryfit T-Shirt</h2>
      <p className="text-gray-600">180 GSM Micro Fabric</p>
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="text-2xl font-bold text-indigo-700">₹120</span>
        <span className="line-through text-gray-400">₹240</span>
      </div>
    </div>

    {/* Moved Colors & Sizes up here */}
    <div className="w-full">
      <div className="mb-2">
        <h3 className="font-semibold mb-1 flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          Selected Colors
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeColors.length > 0 ? (
            activeColors.map(color => (
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
      </div>

      <div className="mb-2">
        <h3 className="font-semibold mb-1 flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          Selected Sizes
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeSizes.length > 0 ? (
            activeSizes.map(size => (
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
  </div>
</div>


        {/* Right Column - Customization */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-4">
          {/* Placement */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Design Placement</h2>
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
                    onChange={() => toggleSelection(name, selectedPlacement, setSelectedPlacement)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Design Upload */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Upload Your Design</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-col items-center">
                {uploadedImage ? (
                  <>
                    <img src={uploadedImage} alt="Preview" className="max-h-40 mb-3 rounded" />
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      Change Design
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="flex flex-col items-center text-gray-500 hover:text-indigo-600"
                  >
                    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Click to upload</span>
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
          </div>

          {/* Quantity Table */}
          <div>
            <h2 className="text-lg font-bold mb-3 text-indigo-800">Select Quantities</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-2 bg-gray-100 sticky left-0">Color \ Size</th>
                    {sizes.map(size => (
                      <th key={size} className={`p-2 ${activeSizes.includes(size) ? "bg-indigo-50" : "bg-gray-100"}`}>
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(colorMap).map(color => (
                    <tr key={color}>
                      <td className={`p-2 sticky left-0 ${activeColors.includes(color) ? "bg-indigo-50" : "bg-gray-50"}`}>
                        <div className="flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full mr-2 border"
                            style={{ backgroundColor: colorMap[color] }}
                          ></span>
                          <span className="truncate max-w-[80px]">{color}</span>
                        </div>
                      </td>
                      {sizes.map(size => (
                        <td key={size} className={`p-1 ${quantities[`${color}-${size}`] > 0 ? "bg-indigo-50" : ""}`}>
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
                {selectedPlacement.map(p => <li key={p} className="text-sm">• {p}</li>)}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Colors:</h3>
            {activeColors.length > 0 ? (
              <ul className="space-y-1">
                {activeColors.map(c => <li key={c} className="text-sm">• {c}</li>)}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Sizes:</h3>
            {activeSizes.length > 0 ? (
              <ul className="space-y-1">
                {activeSizes.map(s => <li key={s} className="text-sm">• {s}</li>)}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">None selected</p>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={selectedPlacement.length === 0 || activeColors.length === 0 || activeSizes.length === 0}
          className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
            selectedPlacement.length === 0 || activeColors.length === 0 || activeSizes.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Order;