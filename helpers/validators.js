const { check, param, validationResult } = require('express-validator');

exports.login = [
    check('email')
        .notEmpty().withMessage('Email is required'),
    check('password')
        .notEmpty().withMessage('Password is required'),
];

exports.signup = [
    check('username')
        .notEmpty().withMessage('Username is required'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Invalid Email Address'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .bail()
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
        .custom((value, { req }) => {
            if (value === req.body.passwordConfirm) return true;
            throw new Error('Passwords mismatch');
        }),
    check('passwordConfirm')
        .notEmpty().withMessage('Password Confirmation is required'),
];

exports.createCartItem = [
    check('productId')
        .notEmpty().withMessage('You have to specify the product ID')
        .bail()
        .isMongoId().withMessage('The Product ID is invalid'),
    check('quantity')
        .notEmpty().withMessage('You have to specify the quantity')
        .bail()
        .isInt({min: 1})
];

exports.updateCartItem = [
    param('itemId')
        .notEmpty().withMessage('You have to specify the Cart Item ID')
        .bail()
        .isMongoId().withMessage('The Cart Item ID is invalid'),
    check('quantity')
        .notEmpty().withMessage('You have to specify the quantity')
        .bail()
        .isInt({min: 1})
];

exports.deleteCartItem = [
    param('itemId')
        .notEmpty().withMessage('You have to specify the Cart Item ID')
        .bail()
        .isMongoId().withMessage('The Cart Item ID is invalid')
];

exports.submitOrder = [
    check('itemId')
        .notEmpty().withMessage('You have to specify the Cart Item ID')
        .bail()
        .isMongoId().withMessage('The Cart Item ID is invalid'),
    check('address')
        .notEmpty().withMessage('You have to specify your delivery address')
];

exports.submitOrders = [
    check('address')
        .notEmpty().withMessage('You have to specify your delivery address')
]

exports.deleteOrder = [
    param('orderId')
        .notEmpty().withMessage('You have to specify the Order ID')
        .bail()
        .isMongoId().withMessage('The Order ID is invalid'),
];

exports.addProduct = [
    check('name')
        .notEmpty().withMessage('Product Name is required'),
    check('price')
        .notEmpty().withMessage('Product Price is required')
        .bail()
        .isInt({min: 1}).withMessage('Price isn\'t a valid number'),
    check('category')
        .notEmpty().withMessage('Category is required'),
    check('image')
        .custom((value, {req}) => {
            if (!req.file) throw new Error("Product Image is required");
            return true;
        })
];

exports.updateOrder = [
    param('orderId')
        .notEmpty().withMessage('You have to specify the Order ID')
        .bail()
        .isMongoId().withMessage('Invalid Order ID'),
    check('status')
        .notEmpty().withMessage('You haven\'t selected a new status for the order')
        .bail()
        .isIn(['pending', 'sent', 'received']).withMessage('Invalid status value')
]

/** @type {import("express").RequestHandler} */
exports.requireValidation = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('back');
    }

    next();
}