const mongoose = require('mongoose');
const productsModel = require('../models/products.model');

/** @type {import("express").RequestHandler} */
exports.getProductDetails = ({ params }, res, next) => {

    if (mongoose.isValidObjectId(params.id)) {
        productsModel.getProductById(params.id)
        .then(product => {
            res.render('product/details', {
                product: product
            })
        })
    } else {
        res.render('product/details', {
            product: undefined
        })
    }

}