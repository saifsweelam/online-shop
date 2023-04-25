const ordersModel = require('../models/orders.model');
const cartItemsModel = require('../models/cart-items.model');
const validationResult = require('express-validator').validationResult;

/** @type {import("express").RequestHandler} */
exports.getOrders = (req, res, next) => {
    ordersModel
        .getOrdersByUserId(req.session.userId)
        .then((orders) => res.render('orders/orders', {orders: orders}))
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.postOrder = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('back');
    }

    cartItemsModel
        .getCartItemById(req.body.itemId)
        .then((item) => {
            if (!item) throw new Error('This Cart Item doesn\'t exist');

            return ordersModel.createOrder(item, req.body.address)
        })
        .then(() => cartItemsModel.deleteCartItem(req.body.itemId))
        .then(() => {
            req.flash('success', 'Order Submitted Successfully');
            res.redirect('/orders');
        })
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.postOrderAll = (req, res, next) => {
    cartItemsModel
        .getCartByUserId(req.session.userId)
        .then((items) => ordersModel.createManyOrders(items, req.body.address))
        .then(() => cartItemsModel.emptyCartByUserId(req.session.userId))
        .then(() => {
            req.flash('success', 'Orders Submitted Successfully');
            res.redirect('/orders');
        })
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.postCancel = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('back');
    }

    ordersModel
        .deleteOrder(req.params.orderId)
        .then(() => {
            req.flash('success', 'Order Cancelled Successfully');
            res.redirect('/orders');
        })
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}