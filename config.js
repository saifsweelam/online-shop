const path = require('path');

module.exports = {
    deploy: {
        port: 3000
    },
    views: {
        engine: 'ejs',
        dir: path.join(__dirname, 'views')
    },
    static: {
        dir: path.join(__dirname, 'assets')
    },
    db: {
        uri: process.env.SHOP_DB_URI || 'mongodb://127.0.0.1:27017/online-shop'
    }
}