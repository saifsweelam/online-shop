/** @type {import("express").RequestHandler} */
exports.requiresAuth = ({ session }, res, next) => {
    if (!session.userId) return res.redirect('/login');
    next();
}

/** @type {import("express").RequestHandler} */
exports.requiresNoAuth = ({ session }, res, next) => {
    if (session.userId) return res.redirect('/');
    next();
}