const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: { 
        type: String, 
        unique: true,
        required: true
    },
    description: String,
    image: String,
    document: String,
    parameter_types: String,
    product_price: { 
        type: Number, 
        required: true
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }], 
    parameters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'parameters' }],
}, { timestamps: true });

const product = mongoose.model("Product", productSchema);

module.exports = {
    product
};
