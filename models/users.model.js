const User = require('./schemas').User;
const db = require('./db');

const bcrypt = require('bcrypt');

exports.getUser = (email) => {
    return db.connect(() => User.findOne({email: email}))
}

exports.createUser = (username, email, password) => {
    return bcrypt.hash(password, 10)
    .then((hashed) => {
        let user = new User({
            username: username,
            email: email,
            password: hashed
        })
        return db.connect(() => user.save());
    })
}

exports.validatePassword = (user, password) => {
    return bcrypt.compare(password, user.password)
    .then(same => {
        if (!same) throw new Error('The password entered is incorrect.');
        return user;
    })
}