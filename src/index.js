const path = require('path');
const express = require('express');
const hbs = require('hbs');

const viewPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

let app = express();
let port = process.env.PORT || 3000;

let homeRouter = require('../routers/home');

// Setup handlebars engine and views
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// Setup static directory
app.use(express.static(publicPath));

app.use('', homeRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


