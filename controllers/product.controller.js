const productsModel = require('../models/products.model');

/** @type {import("express").RequestHandler} */
exports.getProductDetails = ({ params }, res, next) => {

    productsModel.getProductById(params.id)
    .then(product => {
        res.render('product/details', {
            product: product
        })
    })

}