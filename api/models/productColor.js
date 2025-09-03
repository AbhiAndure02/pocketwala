import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
},
hexCode:{
      type:String,
        require: true
}
},
{
        timestamps: true // adds createdAt and updatedAt fields

});
const ProductColor = mongoose.model('product-Color', productColorSchema)

export default ProductColor