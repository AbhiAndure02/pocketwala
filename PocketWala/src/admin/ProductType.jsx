import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductType.css';

const ProductType = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [formData, setFormData] = useState({ type: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all product types
  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product-types`);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        // If response.data is directly the array
        setProductTypes(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        // If response.data.data is the array
        setProductTypes(response.data.data);
      } else {
        console.error('Unexpected API response format:', response.data);
        setMessage('Unexpected data format received from server');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product types:', error);
      setMessage('Error fetching product types');
      setLoading(false);
    }
  };

  // Create or update product type
  const saveProductType = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        // Update existing
        await axios.put(`/api/product-types/${editingId}`, formData);
        setMessage('Product type updated successfully');
      } else {
        // Create new
        await axios.post(`/api/product-types`, formData);
        setMessage('Product type created successfully');
      }
      setFormData({ type: '' });
      setEditingId(null);
      fetchProductTypes();
    } catch (error) {
      console.error('Error saving product type:', error);
      setMessage('Error saving product type');
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

  // Set form for editing
  const startEditing = (productType) => {
    setFormData({ type: productType.type });
    setEditingId(productType._id);
  };

  // Cancel editing
  const cancelEditing = () => {
    setFormData({ type: '' });
    setEditingId(null);
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

  // Fetch product types on component mount
  useEffect(() => {
    fetchProductTypes();
  }, []);

  return (
    <div className="product-type-container">
      <h1>Product Type Management</h1>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      <div className="form-section">
        <h2>{editingId ? 'Edit Product Type' : 'Add New Product Type'}</h2>
        <form onSubmit={saveProductType}>
          <div className="form-group">
            <label htmlFor="type">Product Type:</label>
            <input
              type="text"
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ type: e.target.value })}
              required
              placeholder="Enter product type"
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : (editingId ? 'Update' : 'Create')}
            </button>
            
            {editingId && (
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
                        onClick={() => startEditing(type)}
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
    </div>
  );
};

export default ProductType;