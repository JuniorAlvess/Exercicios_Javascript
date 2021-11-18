const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(routes);    
// /:nome -> nome é o parametro
// ? -> nome é opcional

// req.params -> retorna os parametros da rota (ex: /:nome)
// req.query -> query string (?nome=Junior)
// req.body -> corpo da requisição ex: { name: 'Junior' }

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});