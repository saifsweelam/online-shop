const usersModel = require('../models/users.model');
const productsModel = require('../models/products.model');
const ordersModel = require('../models/orders.model');

/** @type {import("express").RequestHandler} */
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product');
}

/** @type {import("express").RequestHandler} */
exports.postAddProduct = (req, res, next) => {
    productsModel
        .createProduct(
            req.body.name,
            req.body.price,
            req.body.category,
            req.body.description,
            req.file.filename
        )
        .then(product => {
            req.flash('success', 'Product placed successfully');
            res.redirect('/product/' + product._id);
        })
        .catch(e => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.getManageOrders = (req, res, next) => {
    let status = req.query.status;
    status == 'all' && (status = undefined);
    let promise = req.query.email ?
        usersModel
            .getUser(req.query.email)
            .then((user) => {
                if (!user) throw new Error('This User Doesn\'t exist');

                return ordersModel.getOrdersByUserId(user._id, status);
            })
        : ordersModel.getOrders(status);

    promise
        .then(orders => {
            res.render('admin/manage-orders', { orders: orders });
        })
        .catch(e => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}

/** @type {import("express").RequestHandler} */
exports.postUpdateOrder = (req, res, next) => {
    ordersModel
    .updateOrder(req.params.orderId, req.body.status)
    .then(() => {
            req.flash('success', 'Order Updated Successfully');
            res.redirect('/admin/orders');
        })
        .catch((e) => {
            req.flash('error', e.toString());
            res.redirect('back');
        })
}