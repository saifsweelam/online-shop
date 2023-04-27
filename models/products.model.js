const Product = require('./schemas').Product;
const db = require('./db');

exports.getProducts = (category) => {
    let options = {};
    category && (options.category = category);
    return db.connect(() => Product.find(options));
}

exports.getProductById = (id) => {
    return db.connect(() => Product.findById(id));
}

exports.createProduct = (name, price, category, description, image) => {
    let product = new Product({
        name: name,
        price: price,
        category: category,
        description: description,
        image: image
    })

    return db.connect(() => product.save());
}