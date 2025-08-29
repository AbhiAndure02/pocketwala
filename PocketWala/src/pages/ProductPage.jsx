import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductPage = () => {
  const { slug } = useParams();
  
  // Sample product data - in a real app, you'd fetch this from an API
  const products = [
    {
      id: 1,
      name: 'Classic Premium Tee',
      slug: 'classic-premium-tee',
      price: '$29.99',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'common',
      description: 'Our premium t-shirt made from 100% organic cotton. Comfortable fit with a classic design that never goes out of style.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Gray', 'Navy']
    },
    {
      id: 2,
      name: 'Vintage Graphic Tee',
      slug: 'vintage-graphic-tee',
      price: '$34.99',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'common',
      description: 'Vintage-inspired graphic tee with a soft, worn-in feel. Features a unique design that stands out from the crowd.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White', 'Cream', 'Light Blue']
    },
    {
      id: 3,
      name: 'Pocket Design Tee',
      slug: 'pocket-design-tee',
      price: '$27.99',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'common',
      description: 'Classic t-shirt with a chest pocket for added functionality. Perfect for everyday wear with a casual yet put-together look.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Navy', 'Green']
    },
    {
      id: 4,
      name: 'Oversized Comfort Tee',
      slug: 'oversized-comfort-tee',
      price: '$32.99',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'common',
      description: 'Relaxed fit t-shirt made from ultra-soft fabric. Perfect for lounging or casual outings with a stylish oversized silhouette.',
      sizes: ['S', 'M', 'L'],
      colors: ['White', 'Black', 'Olive', 'Dusty Pink']
    },
    {
      id: 5,
      name: 'Summer Floral Tee',
      slug: 'summer-floral-tee',
      price: '$36.99',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'seasonal',
      description: 'Bright floral print t-shirt perfect for summer. Made from breathable fabric to keep you cool on warm days.',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Yellow', 'Light Blue']
    },
    {
      id: 6,
      name: 'Winter Thermal Tee',
      slug: 'winter-thermal-tee',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'seasonal',
      description: 'Thermal long-sleeve t-shirt with ribbed texture. Provides extra warmth during colder months without sacrificing style.',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Navy', 'Black', 'Burgundy', 'Gray']
    },
    {
      id: 7,
      name: 'Basic Plain Tee',
      slug: 'basic-plain-tee',
      price: '$19.99',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Unisex',
      type: 'plain',
      description: 'Essential plain t-shirt that works with any outfit. High-quality fabric that maintains its shape wash after wash.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Gray', 'Navy', 'Burgundy', 'Green']
    },
    {
      id: 8,
      name: 'Custom Print Tee',
      slug: 'custom-print-tee',
      price: '$44.99',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Unisex',
      type: 'customize',
      description: 'Customizable t-shirt that allows you to express your unique style. Perfect for special events or personal expression.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray']
    }
  ];

  // Find the product with the matching slug
  const product = products.find(p => p.slug === slug);

  // If product not found, show error message
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link> / <span className="text-gray-600">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1 p-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:flex-1 p-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-600 mt-2">{product.price}</p>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <p className="text-gray-700 mt-2">{product.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;