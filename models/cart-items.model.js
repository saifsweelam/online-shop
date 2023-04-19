const CartItem = require('./schemas').CartItem;
const { default: mongoose } = require('mongoose');
const db = require('./db');

exports.getCartItemById = (itemId) => {
    return db.connect(() => CartItem.findById(itemId));
}

exports.getCartItemByUserAndProduct = (userId, productId) => {
    return db.connect(() => CartItem.findOne({userId: userId, productId: productId}));
}

exports.addCartItem = (userId, productId, quantity) => {
    let cartItem = new CartItem({
        userId: userId,
        productId: productId,
        quantity: quantity,
        timeAdded: Date.now()
    });
    return db.connect(() => cartItem.save());
}

exports.updateCartItem = (itemId, quantity) => {
    return db.connect(() => CartItem.updateOne({ _id: itemId }, {
        $set: {
            quantity: quantity,
            timeAdded: Date.now()
        }
    }));
}

exports.deleteCartItem = (itemId) => {
    return db.connect(() => CartItem.findByIdAndDelete(itemId));
}

exports.getCartByUserId = (userId) => {
    return db.connect(() => {
        return CartItem.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' }
        ])
    });
}