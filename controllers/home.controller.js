const productsModel = require('../models/products.model');

/** @type {import("express").RequestHandler} */
exports.getHome = ({ query }, res, next) => {

    let category = query.category;
    category === 'all' && (category = undefined);

    productsModel
        .getProducts(category)
        .then(products => {
            res.render('home/index', {
                products: products
            });
        })

}