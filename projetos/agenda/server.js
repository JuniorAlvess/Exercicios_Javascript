require('dotenv').config();
const express = require('express');
const app = express();

// MODELA A BASE DE DADOS
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.emit('ready');
    })
    .catch(err => console.error(err));


// Identifica o navegador do cliente (cookie).
const session = require('express-session');
// Salva as sessões na base de dados.
const MongoStore = require('connect-mongo');
// Retorna feedback ao usuário e são salvas na sessão.
const flash = require('express-flash');

const routes = require('./routes');
const path = require('path');
// Protege a aplicação de vulnerabilidades da web.
const helmet = require('helmet');
// CSRF TOKENS -> São tokens gerados randomicamente. São usados para prevenir ataques de CSRF.
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
// express.urlencoded -> é um middleware que analisa as requisições de entrada codificadas por url.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//express.static -> acessa diretamente os arquivos estáticos da aplicação
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurações da sessão
const sessionOptions = session({
    secret: 'fiwehfwhefw iouhsihfhwefiuh()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// middlewares -> funções que são executadas nas rotas.
// Nossos próprios middlewares.
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware)
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });
})