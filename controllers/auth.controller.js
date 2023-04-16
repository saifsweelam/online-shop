const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}

/** @type {import("express").RequestHandler} */
exports.postLogin = ({ session, body }, res, next) => {
    if (!(body.email && body.password)) return res.redirect('/login');

    usersModel.getUser(body.email)
    .then(user => {
        if (!user) throw new Error('This user doesn\'t exist');

        return usersModel.validatePassword(user, body.password);
    })
    .then(user => {
        session.userId = user._id;
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/login');
    })
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

/** @type {import("express").RequestHandler} */
exports.logout = ({ session }, res, next) => {
    session.destroy(() => {
        res.redirect('/');
    })
}