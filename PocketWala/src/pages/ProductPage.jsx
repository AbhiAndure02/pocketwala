import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedColor && product.colors && product.colors.length > 0) {
      alert('Please select a color');
      return;
    }
    
    addToCart({
      ...product,
      id: product._id,
      selectedSize,
      selectedColor,
      quantity: 1
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery Section */}
            <div className="md:flex-1 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="md:flex md:flex-col gap-2 order-2 md:order-1">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Main Image */}
                <div className={`${images.length > 1 ? 'md:flex-1 order-1 md:order-2' : 'w-full'}`}>
                  <div className="relative overflow-hidden rounded-lg bg-gray-100" style={{ height: '400px' }}>
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Image Navigation Arrows (if multiple images) */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter (if multiple images) */}
                    {images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {selectedImage + 1} / {images.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Details Section */}
            <div className="md:flex-1 p-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                {product.category || 'T-Shirt'}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-600 mt-2">₹{product.price}</p>
              
              {product.discountPrice && product.discountPrice < product.price && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
                  <span className="text-lg font-bold text-red-600">₹{product.discountPrice}</span>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <p className="text-gray-700 mt-2">{product.description || 'No description available.'}</p>
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          selectedSize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          selectedColor === color
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors">
                 <Link to ={`/order/${product._id}`} >order in bulk</Link> 
                </button>
              </div>
              
              {/* Additional Product Info */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {product.material && (
                    <div className="flex">
                      <span className="w-24 font-medium">Material:</span>
                      <span>{product.material}</span>
                    </div>
                  )}
                  {product.fit && (
                    <div className="flex">
                      <span className="w-24 font-medium">Fit:</span>
                      <span>{product.fit}</span>
                    </div>
                  )}
                  {product.care && (
                    <div className="flex">
                      <span className="w-24 font-medium">Care:</span>
                      <span>{product.care}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;