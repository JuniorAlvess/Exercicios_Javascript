const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
    
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // EJS é uma linguagem de modelagem simples que permite gerar marcação HTML com JavaScript simples, 

app.use(routes);

// /:nome -> nome é o parametro
// ? -> nome é opcional

// req.params -> retorna os parametros da rota (ex: /:nome)
// req.query -> query string (?nome=Junior)
// req.body -> corpo da requisição ex: { name: 'Junior' }

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});