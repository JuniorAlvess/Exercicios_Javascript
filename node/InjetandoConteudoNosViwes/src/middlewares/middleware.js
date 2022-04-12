exports.middlewareGlobal = (req, res, next) => {
    if(req.body.cliente) {
        res.locals.umaVariavelLocal = 'Este é o valor de uma variavel local.';
    }

    next();
};