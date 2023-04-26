const cartItemsModel = require('../models/cart-items.model');
const productsModel = require('../models/products.model');

/** @type {import("express").RequestHandler} */
exports.getCart = (req, res, next) => {
    cartItemsModel
        .getCartByUserId(req.session.userId)
        .then(items => {
            let totalPrice = items.reduce((total, item) => total + item.quantity * item.product.price, 0);
            res.render('cart/cart', {
                items: items,
                total: totalPrice
            })
        })
}

/** @type {import("express").RequestHandler} */
exports.postCart = (req, res, next) => {
    cartItemsModel
        .getCartItemByUserAndProduct(req.session.userId, req.body.productId)
        .then(item => {
            if (item) return cartItemsModel.updateCartItem(item._id, item.quantity + parseInt(req.body.quantity));

            return productsModel.getProductById(req.body.productId);
        })
        .then(product => {
            if (!product) throw new Error('This product doesn\'t exist');

            return cartItemsModel.addCartItem(req.session.userId, product, req.body.quantity);
        })
        .then(() => {
            req.flash('success', 'Cart Item Added Successfully');
            res.redirect('/cart');
        })
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.updateCartItem = (req, res, next) => {
    cartItemsModel
        .updateCartItem(req.params.itemId, req.body.quantity)
        .then(() => {
            req.flash('success', 'Cart Item Updated Successfully');
            res.redirect('/cart');
        })
        .catch((e) => {
            req.flash('error', 'Failed to Update Cart Item');
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.deleteCartItem = (req, res, next) => {
    cartItemsModel
        .deleteCartItem(req.params.itemId)
        .then(() => {
            req.flash('success', 'Cart Item Deleted Successfully');
            res.redirect('/cart');
        })
        .catch((e) => {
            req.flash('error', 'Failed to Delete Cart Item');
            res.redirect('back');
        })
}