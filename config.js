const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);

module.exports = new function() {
    this.deploy = {
        port: 3000
    }

    this.views = {
        engine: 'ejs',
        dir: path.join(__dirname, 'views')
    }
    
    this.static = {
        dir: path.join(__dirname, 'assets')
    }
    
    this.thumbnails = {
        dir: path.join(__dirname, 'thumbnails')
    }

    this.db = {
        uri: process.env.SHOP_DB_URI || 'mongodb://127.0.0.1:27017/online-shop'
    }

    this.session = {
        secret: crypto.randomBytes(20).toString('hex'),
        saveUninitialized: false,
        resave: false,
        store: new SessionStore({
            uri: this.db.uri,
            collection: 'sessions'
        })
    }
}