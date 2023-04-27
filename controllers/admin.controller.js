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