import mongoose from "mongoose";
import ProductColor from "../models/productColor.js";

// Create a new product color
export const createProductColor = async (req, res) => {
  try {
    const { name, hexCode } = req.body;

    // Check if product color already exists
    const existingColor = await ProductColor.findOne({ name });
    if (existingColor) {
      return res.status(400).json({
        success: false,
        message: "Product color already exists"
      });
    }

    // Create new product color
    const newProductColor = new ProductColor({ name, hexCode });
    const savedProductColor = await newProductColor.save();

    res.status(201).json({
      success: true,
      message: "Product color created successfully",
      data: savedProductColor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product color",
      error: error.message
    });
  }
};

// Get all product colors
export const getAllProductColors = async (req, res) => {
  try {
    const productColors = await ProductColor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: productColors.length,
      data: productColors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product colors",
      error: error.message
    });
  }
};

// Get single product color by ID
export const getProductColorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product color ID"
      });
    }

    const productColor = await ProductColor.findById(id);

    if (!productColor) {
      return res.status(404).json({
        success: false,
        message: "Product color not found"
      });
    }

    res.status(200).json({
      success: true,
      data: productColor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product color",
      error: error.message
    });
  }
};

// Delete product color
export const deleteProductColor = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product color ID"
      });
    }

    const deletedProductColor = await ProductColor.findByIdAndDelete(id);

    if (!deletedProductColor) {
      return res.status(404).json({
        success: false,
        message: "Product color not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product color deleted successfully",
      data: deletedProductColor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product color",
      error: error.message
    });
  }
};

// Update product color
export const updateProductColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hexCode } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product color ID"
      });
    }

    // Check if new color already exists (excluding current document)
    const existingColor = await ProductColor.findOne({
      color,
      _id: { $ne: id }
    });
    
    if (existingColor) {
      return res.status(400).json({
        success: false,
        message: "Product color already exists"
      });
    }

    const updatedProductColor = await ProductColor.findByIdAndUpdate(
      id,
      { name, hexCode },
      { new: true, runValidators: true }
    );

    if (!updatedProductColor) {
      return res.status(404).json({
        success: false,
        message: "Product color not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product color updated successfully",
      data: updatedProductColor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product color",
      error: error.message
    });
  }
};  