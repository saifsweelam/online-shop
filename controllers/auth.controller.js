const usersModel = require('../models/users.model');
const validationResult = require('express-validator').validationResult;

/** @type {import("express").RequestHandler} */
exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}

/** @type {import("express").RequestHandler} */
exports.postLogin = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('/login');
    }

    usersModel
        .getUser(req.body.email)
        .then(user => {
            if (!user) throw new Error('This user doesn\'t exist');

            return usersModel.validatePassword(user, req.body.password);
        })
        .then(user => {
            req.session.userId = user._id;
            res.redirect('/');
        })
        .catch((err) => {
            req.flash('error', err.toString());
            res.redirect('/login');
        })
}

/** @type {import("express").RequestHandler} */
exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
}

/** @type {import("express").RequestHandler} */
exports.postSignup = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('/signup');
    }

    let body = req.body;
    usersModel
        .getUser(body.email)
        .then((user) => {
            if (user) throw new Error('This user already exists');
            else {
                return usersModel.createUser(body.username, body.email, body.password);
            }
        })
        .then(() => {
            req.flash('success', 'User was created successfully')
            res.redirect('/login');
        })
        .catch((err) => {
            req.flash('error', err.toString());
            res.redirect('/signup');
        });
}

/** @type {import("express").RequestHandler} */
exports.logout = ({ session }, res, next) => {
    session.destroy(() => {
        res.redirect('/');
    })
}