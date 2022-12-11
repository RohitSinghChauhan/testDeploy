const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    product_type: { type: String, required: true }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;