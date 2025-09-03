import ProductType from "../models/productType.js";

// Create a new product type
export const createProductType = async (req, res) => {
  try {
    const { type } = req.body;

    // Check if product type already exists
    const existingType = await ProductType.findOne({ type });
    if (existingType) {
      return res.status(400).json({
        success: false,
        message: "Product type already exists"
      });
    }

    // Create new product type
    const productType = new ProductType({ type });
    const savedProductType = await productType.save();

    res.status(201).json({
      success: true,
      message: "Product type created successfully",
      data: savedProductType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product type",
      error: error.message
    });
  }
};


// Get all product types
export const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: productTypes.length,
      data: productTypes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product types",
      error: error.message
    });
  }
};


// Get single product type by ID
export const getProductTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type ID"
      });
    }

    const productType = await ProductType.findById(id);

    if (!productType) {
      return res.status(404).json({
        success: false,
        message: "Product type not found"
      });
    }

    res.status(200).json({
      success: true,
      data: productType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product type",
      error: error.message
    });
  }
};


// Delete product type
export const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductType = await ProductType.findByIdAndDelete(id);

    if (!deletedProductType) {
      return res.status(404).json({
        success: false,
        message: "Product type not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product type deleted successfully",
      data: deletedProductType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product type",
      error: error.message
    });
  }
};

// Update product type
export const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type ID"
      });
    }

    // Check if new type already exists (excluding current document)
    const existingType = await ProductType.findOne({
      type,
      _id: { $ne: id }
    });
    
    if (existingType) {
      return res.status(400).json({
        success: false,
        message: "Product type already exists"
      });
    }

    const updatedProductType = await ProductType.findByIdAndUpdate(
      id,
      { type },
      { new: true, runValidators: true }
    );

    if (!updatedProductType) {
      return res.status(404).json({
        success: false,
        message: "Product type not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product type updated successfully",
      data: updatedProductType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product type",
      error: error.message
    });
  }
};