import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
    type:{
        type:String,
        require: true
}
},
{
        timestamps: true // adds createdAt and updatedAt fields

});
const ProductType = mongoose.model('product-type', productTypeSchema)

export default ProductType