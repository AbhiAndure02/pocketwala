import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('types');
  const [productTypes, setProductTypes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  
  // Form states
  const [typeFormData, setTypeFormData] = useState({ type: '' });
  const [colorFormData, setColorFormData] = useState({ name: '', hexCode: '#000000' });
  
  const [editingTypeId, setEditingTypeId] = useState(null);
  const [editingColorId, setEditingColorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all product types
  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product-types`);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        setProductTypes(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setProductTypes(response.data.data);
      } else {
        console.error('Unexpected API response format:', response.data);
        setMessage('Unexpected data format received from server');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
      setMessage('Error fetching product types');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all product colors
  const fetchProductColors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product-colors`);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        setProductColors(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setProductColors(response.data.data);
      } else {
        console.error('Unexpected API response format:', response.data);
        setMessage('Unexpected data format received from server');
      }
    } catch (error) {
      console.error('Error fetching product colors:', error);
      setMessage('Error fetching product colors');
    } finally {
      setLoading(false);
    }
  };

  // Create or update product type
  const saveProductType = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingTypeId) {
        // Update existing
        await axios.put(`/api/product-types/${editingTypeId}`, typeFormData);
        setMessage('Product type updated successfully');
      } else {
        // Create new
        await axios.post(`/api/product-types`, typeFormData);
        setMessage('Product type created successfully');
      }
      setTypeFormData({ type: '' });
      setEditingTypeId(null);
      fetchProductTypes();
    } catch (error) {
      console.error('Error saving product type:', error);
      setMessage('Error saving product type');
      setLoading(false);
    }
  };

  // Create or update product color
  const saveProductColor = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingColorId) {
        // Update existing
        await axios.put(`/api/product-colors/${editingColorId}`, colorFormData);
        setMessage('Product color updated successfully');
      } else {
        // Create new
        await axios.post(`/api/product-colors`, colorFormData);
        setMessage('Product color created successfully');
      }
      setColorFormData({ name: '', hexCode: '#000000' });
      setEditingColorId(null);
      fetchProductColors();
    } catch (error) {
      console.error('Error saving product color:', error);
      setMessage('Error saving product color');
      setLoading(false);
    }
  };

  // Delete product type
  const deleteProductType = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product type?')) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`/api/product-types/${id}`);
      setMessage('Product type deleted successfully');
      fetchProductTypes();
    } catch (error) {
      console.error('Error deleting product type:', error);
      setMessage('Error deleting product type');
      setLoading(false);
    }
  };

  // Delete product color
  const deleteProductColor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product color?')) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`/api/product-colors/${id}`);
      setMessage('Product color deleted successfully');
      fetchProductColors();
    } catch (error) {
      console.error('Error deleting product color:', error);
      setMessage('Error deleting product color');
      setLoading(false);
    }
  };

  // Set form for editing type
  const startEditingType = (productType) => {
    setTypeFormData({ type: productType.type });
    setEditingTypeId(productType._id);
  };

  // Set form for editing color
  const startEditingColor = (productColor) => {
    setColorFormData({ 
      name: productColor.name, 
      hexCode: productColor.hexCode || '#000000' 
    });
    setEditingColorId(productColor._id);
  };

  // Cancel editing
  const cancelEditing = () => {
    if (activeTab === 'types') {
      setTypeFormData({ type: '' });
      setEditingTypeId(null);
    } else {
      setColorFormData({ name: '', hexCode: '#000000' });
      setEditingColorId(null);
    }
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch data on component mount and when tab changes
  useEffect(() => {
    if (activeTab === 'types') {
      fetchProductTypes();
    } else {
      fetchProductColors();
    }
  }, [activeTab]);

  return (
    <div className="product-management-container">
      <h1>Product Management</h1>
      
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={activeTab === 'types' ? 'active' : ''}
          onClick={() => setActiveTab('types')}
        >
          Product Types
        </button>
        <button 
          className={activeTab === 'colors' ? 'active' : ''}
          onClick={() => setActiveTab('colors')}
        >
          Product Colors
        </button>
      </div>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      {/* Product Types Tab */}
      {activeTab === 'types' && (
        <>
          <div className="form-section">
            <h2>{editingTypeId ? 'Edit Product Type' : 'Add New Product Type'}</h2>
            <form onSubmit={saveProductType}>
              <div className="form-group">
                <label htmlFor="type">Product Type:</label>
                <input
                  type="text"
                  id="type"
                  value={typeFormData.type}
                  onChange={(e) => setTypeFormData({ type: e.target.value })}
                  required
                  placeholder="Enter product type"
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : (editingTypeId ? 'Update' : 'Create')}
                </button>
                
                {editingTypeId && (
                  <button type="button" onClick={cancelEditing} disabled={loading}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="list-section">
            <h2>Product Types</h2>
            
            {loading && productTypes.length === 0 ? (
              <p>Loading product types...</p>
            ) : productTypes.length === 0 ? (
              <p>No product types found. Add one above.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product Type</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTypes.map((type) => (
                      <tr key={type._id}>
                        <td>{type.type}</td>
                        <td>{type.createdAt ? new Date(type.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>{type.updatedAt ? new Date(type.updatedAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button 
                            onClick={() => startEditingType(type)}
                            disabled={loading}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteProductType(type._id)}
                            disabled={loading}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Product Colors Tab */}
      {activeTab === 'colors' && (
        <>
          <div className="form-section">
            <h2>{editingColorId ? 'Edit Product Color' : 'Add New Product Color'}</h2>
            <form onSubmit={saveProductColor}>
              <div className="form-group">
                <label htmlFor="colorName">Color Name:</label>
                <input
                  type="text"
                  id="colorName"
                  value={colorFormData.name}
                  onChange={(e) => setColorFormData({ ...colorFormData, name: e.target.value })}
                  required
                  placeholder="Enter color name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="hexCode">Color Code:</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="hexCode"
                    value={colorFormData.hexCode}
                    onChange={(e) => setColorFormData({ ...colorFormData, hexCode: e.target.value })}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={colorFormData.hexCode}
                    onChange={(e) => setColorFormData({ ...colorFormData, hexCode: e.target.value })}
                    placeholder="#000000"
                    className="color-code-input"
                  />
                </div>
              </div>
              
              <div className="color-preview">
                <div 
                  className="color-box" 
                  style={{ backgroundColor: colorFormData.hexCode }}
                ></div>
                <span>{colorFormData.name || 'Color Preview'}</span>
              </div>
              
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : (editingColorId ? 'Update' : 'Create')}
                </button>
                
                {editingColorId && (
                  <button type="button" onClick={cancelEditing} disabled={loading}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="list-section">
            <h2>Product Colors</h2>
            
            {loading && productColors.length === 0 ? (
              <p>Loading product colors...</p>
            ) : productColors.length === 0 ? (
              <p>No product colors found. Add one above.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Color</th>
                      <th>Name</th>
                      <th>Hex Code</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productColors.map((color) => (
                      <tr key={color._id}>
                        <td>
                          <div 
                            className="color-box small" 
                            style={{ backgroundColor: color.hexCode || '#000000' }}
                          ></div>
                        </td>
                        <td>{color.name}</td>
                        <td>{color.hexCode || 'N/A'}</td>
                        <td>{color.createdAt ? new Date(color.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>{color.updatedAt ? new Date(color.updatedAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button 
                            onClick={() => startEditingColor(color)}
                            disabled={loading}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteProductColor(color._id)}
                            disabled={loading}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;