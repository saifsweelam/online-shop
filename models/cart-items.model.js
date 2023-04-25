const CartItem = require('./schemas').CartItem;
const db = require('./db');

exports.getCartItemById = (itemId) => {
    return db.connect(() => CartItem.findById(itemId));
}

exports.getCartItemByUserAndProduct = (userId, productId) => {
    return db.connect(() => CartItem.findOne({userId: userId, productId: productId}));
}

exports.addCartItem = (userId, product, quantity) => {
    let cartItem = new CartItem({
        userId: userId,
        product: product,
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
    return db.connect(() => CartItem.find({userId: userId}));
}

exports.emptyCartByUserId = (userId) => {
    return db.connect(() => CartItem.deleteMany({userId: userId}));
}