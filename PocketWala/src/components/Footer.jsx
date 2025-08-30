import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
              T-Shirt Store
            </Link>
            <p className="text-gray-400 mb-4">
              Premium quality t-shirts for every occasion. We offer the best designs, materials, and prices in the market.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-400 hover:text-white transition-colors">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/men" className="text-gray-400 hover:text-white transition-colors">
                  Men's T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="text-gray-400 hover:text-white transition-colors">
                  Women's T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="text-gray-400 hover:text-white transition-colors">
                  Kids T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/unisex" className="text-gray-400 hover:text-white transition-colors">
                  Unisex T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/seasonal" className="text-gray-400 hover:text-white transition-colors">
                  Seasonal Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <span className="text-gray-400">123 Fashion Street, City, State 12345</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <span className="text-gray-400">support@tshirtstore.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">NEWSLETTER</h4>
              <p className="text-gray-400 text-sm mb-3">Subscribe for updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} T-Shirt Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm mb-2">We Accept:</p>
          <div className="flex space-x-2">
            <div className="bg-white p-1 rounded">
              <span className="text-xs font-bold text-gray-800">VISA</span>
            </div>
            <div className="bg-white p-1 rounded">
              <span className="text-xs font-bold text-gray-800">MC</span>
            </div>
            <div className="bg-white p-1 rounded">
              <span className="text-xs font-bold text-gray-800">PayPal</span>
            </div>
            <div className="bg-white p-1 rounded">
              <span className="text-xs font-bold text-gray-800">UPI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;