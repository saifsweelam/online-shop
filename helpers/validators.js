const check = require('express-validator').check;

exports.login = [
    check('email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

exports.signup = [
    check('username').notEmpty().withMessage('Username is required'),
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
    check('passwordConfirm').notEmpty().withMessage('Password Confirmation is required'),
];