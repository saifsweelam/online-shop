const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    description: String,
    price: Number
})

const cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    timeAdded: Date
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

exports.Product = mongoose.model('Product', productSchema);
exports.CartItem = mongoose.model('CartItem', cartItemSchema);
exports.User = mongoose.model('User', userSchema);