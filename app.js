const express = require('express');
const config = require('./config');

// Initialize App
const app = express();

// Views
app.set('views', config.views.dir);
app.set('view engine', config.views.engine);

// Static Assets
app.use(express.static(config.static.dir));


app.listen(
    config.deploy.port,
    () => console.log(`Server running on port ${config.deploy.port}`)
)