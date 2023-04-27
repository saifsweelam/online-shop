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
    product: productSchema,
    quantity: Number,
    timeAdded: Date
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: productSchema,
    quantity: Number,
    timeUpdated: Date,
    address: String,
    status: {
        type: String,
        default: 'pending'
    }
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

exports.Product = mongoose.model('Product', productSchema);
exports.CartItem = mongoose.model('CartItem', cartItemSchema);
exports.Order = mongoose.model('Order', orderSchema);
exports.User = mongoose.model('User', userSchema);