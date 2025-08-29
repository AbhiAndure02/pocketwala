import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'common'
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: [String], 
        default: []
    },
    sizes: {
        type: [String], 
        default: []
    },
    colors: {
        type: [String], 
        default: []
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;
