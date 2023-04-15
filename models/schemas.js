const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    description: String,
    price: Number
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

exports.Product = mongoose.model('Product', productSchema);
exports.User = mongoose.model('User', userSchema);