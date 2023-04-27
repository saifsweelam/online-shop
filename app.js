const express = require('express');
const config = require('./config');
const session = require('express-session');
const flash = require('connect-flash');

// Initialize App
const app = express();

// Routers
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const ordersRouter = require('./routes/orders.route');
const adminRouter = require('./routes/admin.route');

// Views
app.set('views', config.views.dir);
app.set('view engine', config.views.engine);

// Handle Form Data
app.use(express.urlencoded({extended: true}));

// Static Assets
app.use(express.static(config.static.dir));
app.use(express.static(config.thumbnails.dir));

// Session
app.use(session(config.session));
app.use(({ session }, res, next) => {
    res.locals.session = session; // Make session accessible in ejs templates
    next();
});

// Flash Messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashed = {
        errors: req.flash('error'),
        warnings: req.flash('warning'),
        successes: req.flash('success'),
    };
    next();
});

// Router Pathes
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).render('404');
})

app.listen(
    config.deploy.port,
    () => console.log(`Server running on port ${config.deploy.port}`)
)