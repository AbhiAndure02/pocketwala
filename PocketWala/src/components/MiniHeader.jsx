import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MiniHeader = () => {
  const [activeTab, setActiveTab] = useState('/');

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center py-4">
          <Link 
            to="/" 
            className={`mx-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === '/' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('/')}
          >
            Custom T-Shirts
          </Link>
          <Link 
            to="/common-tshirts" 
            className={`mx-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'common-tshirts' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('common-tshirts')}
          >
            Common T-Shirts
          </Link>
          <Link 
            to="/seasonal-tshirts" 
            className={`mx-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'seasonal' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('seasonal')}
          >
            Seasonal T-Shirts
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MiniHeader;