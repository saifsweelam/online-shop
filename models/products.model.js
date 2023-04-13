const Product = require('./schemas').Product;
const db = require('./db');

exports.getProducts = (category) => {
    let options = {};
    category && (options.category = category);
    return db.connect(() => Product.find(options));
}