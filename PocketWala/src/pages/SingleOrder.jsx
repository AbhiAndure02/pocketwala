import React, { useState, useRef } from "react";
import axios from "axios";
import img from "../assets/vithu.jpeg";
import imgage1 from "../assets/left.png";
import imgage2 from "../assets/right.png";
import imgage3 from "../assets/frontA4.png";
import image4 from "../assets/frontA3.png";
import image5 from "../assets/backA4.png";
import image6 from "../assets/backA3.png";
import { Link } from "react-router-dom";

function SingleOrder() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([null]); // Starts with one upload field

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG/PNG images are allowed.");
      return;
    }

    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert("Image must be less than 2MB.");
      return;
    }

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    // Add new field only if last one was just filled
    if (index === images.length - 1) {
      setImages([...newImages, null]);
    }
  };

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

  const handleSubmit = async () => {
    if (!selectedSize || !selectedColor || !selectedPlacement) {
      alert("Please select size, color, and placement.");
      return;
    }

    const orderData = {
      size: selectedSize,
      color: selectedColor,
      placement: selectedPlacement,
      quantity,
      price: quantity * 120,
    };

    try {
      const response = await axios.post("/api/order", orderData);
      alert("Order Submitted Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 p-6">
      <div className="lg:w-1/2">
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Polyester Dryfit T-Shirt
          </h2>
          <div className="flex flex-col items-center mt-6">
            <img
              src={img}
              alt="T-shirt"
              className="w-full max-w-md h-auto border rounded-md"
            />
            <p className="text-lg font-semibold mt-4">
              Price:{" "}
              <span className="text-3xl font-bold text-blue-900">₹120</span>
            </p>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <p className="font-semibold">Select Color:</p>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {Object.keys(colorMap).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 border rounded-full ${
                    selectedColor === color ? "border-4 border-yellow-500" : ""
                  }`}
                  style={{ backgroundColor: colorMap[color] }}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="font-semibold">Select Size:</p>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Design */}
          <div className="mt-6">
            <p className="font-semibold">Upload Your Design:</p>
            {images.map((img, index) => (
              <div key={index} className="mb-4">
                  <label
    htmlFor={`file-upload-${index}`}
    className="flx px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
  >
    Upload Image {index + 1}
  </label>
  <input
    id={`file-upload-${index}`}
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e, index)}
    className="hidden"
  />
                {img && (
                  <div className="mt-2 flex items-center">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2">
        <div className="p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center">Select Placement</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {placements.map(({ name, img }) => (
              <label
                key={name}
                className="flex flex-col items-center p-3 border rounded-lg shadow-md cursor-pointer"
              >
                <img src={img} alt={name} className="w-32 h-32 rounded-md" />
                <input
                  type="radio"
                  name="placement"
                  checked={selectedPlacement === name}
                  onChange={() => setSelectedPlacement(name)}
                  className="mt-2"
                />
                <span className="mt-2 font-semibold">{name}</span>
              </label>
            ))}
          </div>

          {/* Quantity */}
          <h2 className="text-2xl font-bold mt-8 text-center">
            Select Quantity
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              className="px-3 py-1 border rounded-md"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-3 py-1 border rounded-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-600 text-2xl w-full p-2 mt-4 rounded-2xl"
          >
            Submit Order
          </button>
          <Link to="order">
            <button className="text-white bg-blue-600 text-2xl w-full p-2 mt-4 rounded-2xl">
              Bulk Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
