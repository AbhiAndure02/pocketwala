import { Button } from 'flowbite-react';
import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ cart, addToCart }) => {
  // Sample product data with slugs
  const allProducts = [
    {
      id: 1,
      name: 'Classic Premium Tee',
      slug: 'classic-premium-tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'common'
    },
    {
      id: 2,
      name: 'Vintage Graphic Tee',
      slug: 'vintage-graphic-tee',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'common'
    },
    {
      id: 3,
      name: 'Pocket Design Tee',
      slug: 'pocket-design-tee',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'common'
    },
    {
      id: 4,
      name: 'Oversized Comfort Tee',
      slug: 'oversized-comfort-tee',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'common'
    },
    {
      id: 5,
      name: 'Summer Floral Tee',
      slug: 'summer-floral-tee',
      price: 36.99,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Women',
      type: 'seasonal'
    },
    {
      id: 6,
      name: 'Winter Thermal Tee',
      slug: 'winter-thermal-tee',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Men',
      type: 'seasonal'
    },
    {
      id: 7,
      name: 'Basic Plain Tee',
      slug: 'basic-plain-tee',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Unisex',
      type: 'plain'
    },
    {
      id: 8,
      name: 'Custom Print Tee',
      slug: 'custom-print-tee',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      category: 'Unisex',
      type: 'customize'
    }
  ];

  // Active tab state
  const [activeTab, setActiveTab] = useState('all');

  // Filter products based on active tab
  const filteredProducts =
    activeTab === 'all' ? allProducts : allProducts.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Cart Link */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">T-Shirt Store</h1>
        <Link 
          to="/cart" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>
      </header>

      {/* T-Shirt Type Tabs */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our T-Shirt Collections</h2>
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl shadow-md">
            {['all', 'seasonal', 'common', 'plain', 'customize'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All T-Shirts' : `${type.charAt(0).toUpperCase() + type.slice(1)} T-Shirts`}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <Link to={`/product/${product.slug}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">{product.name}</h3>
                </Link>
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                <div className='flex flex-col gap-2'>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
                <Button>
                <Link to= '/order'> Bulk Order </Link>
                </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;