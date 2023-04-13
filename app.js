const express = require('express');
const config = require('./config');

// Initialize App
const app = express();

// Routers
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');

// Views
app.set('views', config.views.dir);
app.set('view engine', config.views.engine);

// Static Assets
app.use(express.static(config.static.dir));
app.use(express.static(config.thumbnails.dir));

// Router Pathes
app.use('/', homeRouter);
app.use('/product', productRouter);

app.listen(
    config.deploy.port,
    () => console.log(`Server running on port ${config.deploy.port}`)
)