const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    description: String,
    price: Number
})

exports.Product = mongoose.model('Product', productSchema);