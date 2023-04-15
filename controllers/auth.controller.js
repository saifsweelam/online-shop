const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}

/** @type {import("express").RequestHandler} */
exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
}

/** @type {import("express").RequestHandler} */
exports.postSignup = ({ body }, res, next) => {
    if (!(body.username && body.email && body.password && body.passwordConfirm && body.password === body.passwordConfirm)) return res.redirect('/signup');

    usersModel.getUser(body.email)
    .then((user) => {
        if (user) throw new Error('This user already exists');
        else {
            return usersModel.createUser(body.username, body.email, body.password);
        }
    })
    .then(() => res.redirect('/login'))
    .catch((err) => {
        console.error(err)
        res.redirect('/signup');
    });
}