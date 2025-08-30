import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    }
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the field is part of the address object
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('Name, email, and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/users/register', formData);
      
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-indigo-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full text-center">
        <h1 className="text-green-600 text-5xl font-extrabold opacity-90 mb-6">Sign Up</h1>
        
        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMessage}
          </div>
        )}
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            required
          />
          
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            required
          />
          
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            required
          />
          
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
          />
          
          <input 
            type="text" 
            name="address.street"
            placeholder="Street Address" 
            value={formData.address.street}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              name="address.city"
              placeholder="City" 
              value={formData.address.city}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            />
            
            <input 
              type="text" 
              name="address.state"
              placeholder="State" 
              value={formData.address.state}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              name="address.country"
              placeholder="Country" 
              value={formData.address.country}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            />
            
            <input 
              type="text" 
              name="address.pincode"
              placeholder="Postal Code" 
              value={formData.address.pincode}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`bg-green-600 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-800'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;