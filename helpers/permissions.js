const cartItemsModel = require('../models/cart-items.model');
const ordersModel = require('../models/orders.model');

/** @type {import("express").RequestHandler} */
exports.requiresAuth = ({ session }, res, next) => {
    if (!session.userId) return res.redirect('/login');
    next();
}

/** @type {import("express").RequestHandler} */
exports.requiresNoAuth = ({ session }, res, next) => {
    if (session.userId) return res.redirect('/');
    next();
}

/** @type {import("express").RequestHandler} */
exports.requiresAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
        req.flash('You don\'t have admin access');
        return res.redirect('/');
    }

    next();
}

/** @type {import("express").RequestHandler} */
exports.accessCartItem = (req, res, next) => {
    cartItemsModel
        .getCartItemById(req.params.itemId)
        .then(item => {
            if (!item) {
                req.flash('error', 'This Cart Item doesn\'t exist');
                return res.redirect('back');
            }

            if (!item.userId.equals(req.session.userId)) {
                req.flash('error', 'You don\'t have access to this item');
                return res.redirect('back');
            }

            next();
        })
};

/** @type {import("express").RequestHandler} */
exports.accessOrder = (req, res, next) => {
    ordersModel
        .getOrderById(req.params.orderId)
        .then((order) => {
            if (!order) {
                req.flash('error', 'This Order doesn\'t exist');
                return res.redirect('back');
            }

            if (!(order.userId.equals(req.session.userId) || req.session.isAdmin)) {
                req.flash('error', 'You don\'t have access to this Order');
                return res.redirect('back');
            }

            next();
        })
}