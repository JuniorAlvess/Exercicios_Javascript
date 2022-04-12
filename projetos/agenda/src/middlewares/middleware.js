exports.middlewareGlobal = (req, res, next) => {
    if (req.body.cliente) {
        res.locals.umaVariavelLocal = 'Este é o valor de uma variavel local.';
    }

    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}