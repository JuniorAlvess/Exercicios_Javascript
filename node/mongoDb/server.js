require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready');
    })
    .catch(err => console.error(err));

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
// Nossos próprios middlewares. 
app.use(middlewareGlobal);
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
})