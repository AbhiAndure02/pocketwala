import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { uploadMultipleImages } from "../utils/firebaseStorage";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "Women",
    type: "",
    description: "",
    images: [],
    sizes: [],
    colors: [],
  });

  const [productTypes, setProductTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Fetch product types from backend
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get("/api/product-types");
        // Handle different response formats
        const typesData = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        
        setProductTypes(typesData);
        
        // Set default type if types exist
        if (typesData.length > 0 && !productData.type) {
          setProductData(prev => ({
            ...prev,
            type: typesData[0].type
          }));
        }
      } catch (error) {
        console.error("Error fetching product types:", error);
        setErrorMessage("Failed to load product types");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    };

    fetchProductTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = productData.sizes.includes(size)
      ? productData.sizes.filter((s) => s !== size)
      : [...productData.sizes, size];

    setProductData({
      ...productData,
      sizes: updatedSizes,
    });
  };

  const handleColorChange = (color) => {
    const updatedColors = productData.colors.includes(color)
      ? productData.colors.filter((c) => c !== color)
      : [...productData.colors, color];

    setProductData({
      ...productData,
      colors: updatedColors,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Check if total images would exceed 5
    if (productData.images.length + files.length > 5) {
      setErrorMessage("Maximum 5 images allowed per product");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const newImages = files.map((file) => {
      return {
        id: URL.createObjectURL(file), // Using URL as a simple unique ID
        file: file,
        preview: URL.createObjectURL(file),
      };
    });

    setProductData({
      ...productData,
      images: [...productData.images, ...newImages],
    });
  };

  const removeImage = (id) => {
    setProductData({
      ...productData,
      images: productData.images.filter((img) => img.id !== id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Basic validation
    if (
      !productData.name ||
      !productData.price ||
      !productData.type ||
      productData.images.length === 0
    ) {
      setErrorMessage(
        "Please fill in all required fields and upload at least one image"
      );
      setTimeout(() => setErrorMessage(""), 3000);
      setIsSubmitting(false);
      return;
    }

    try {
      setUploadProgress(0);
      
      // Extract files from images array
      const imageFiles = productData.images.map(img => img.file);
      
      // Upload images to Firebase Storage
      const imageUrls = await uploadMultipleImages(imageFiles);
      
      setUploadProgress(100);
      
      // Prepare data for API submission
      const productPayload = {
        name: productData.name,
        price: Number(productData.price),
        category: productData.category,
        type: productData.type,
        description: productData.description,
        sizes: productData.sizes,
        colors: productData.colors,
        images: imageUrls // Array of Firebase Storage URLs
      };

      // Send data to the API endpoint
      const response = await axios.post("/api/product", productPayload);

      // Show success message
      setSuccessMessage("Product added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // Reset form
      setProductData({
        name: "",
        price: "",
        category: "Women",
        type: productTypes.length > 0 ? productTypes[0].type : "",
        description: "",
        images: [],
        sizes: [],
        colors: [],
      });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to add product. Please try again."
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const colorOptions = [
    "Black",
    "White",
    "Gray",
    "Navy",
    "Red",
    "Green",
    "Yellow",
    "Pink",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-indigo-800">
              Add New T-Shirt
            </h1>
            <p className="text-gray-600 mt-2">
              Fill in the details below to add a new product to your store
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Upload Progress Bar */}
          {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading images...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Oversized Comfort Tee"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., 320"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type *
                  </label>
                  <select
                    name="type"
                    value={productData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  >
                    <option value="">Select a type</option>
                    {productTypes.map((type) => (
                      <option key={type._id} value={type.type}>
                        {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images *
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF (MAX. 5 images)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Describe the product..."
                  />
                </div>
              </div>
            </div>

            {/* Uploaded Images Preview */}
            {productData.images.length > 0 && (
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uploaded Images ({productData.images.length}/5)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selection */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {sizeOptions.map((size) => (
                  <div key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      checked={productData.sizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <div key={color} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`color-${color}`}
                      checked={productData.colors.includes(color)}
                      onChange={() => handleColorChange(color)}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`color-${color}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Product Preview
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-2/5">
                    {productData.images.length > 0 ? (
                      <img
                        src={productData.images[0].preview}
                        alt="Product preview"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">
                          Image preview will appear here
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-3/5">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {productData.name || "Product Name"}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {productData.category}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                        {productData.type || "No type selected"}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mt-3">
                      {productData.price ? `₹${productData.price}` : "Price"}
                    </p>
                    <p className="text-gray-700 mt-4">
                      {productData.description ||
                        "Product description will appear here."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {productData.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {productData.colors.map((color) => (
                        <span
                          key={color}
                          className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;