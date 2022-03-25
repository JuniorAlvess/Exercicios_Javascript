exports.middlewareGlobal = (req, res, next) => {
    // if(req.body.cliente) {
    //     console.log();
    //     console.log(`cliente: ${req.body.cliente}`);
    //     console.log();
    // }

    res.locals.umaVariavelLocal = "Este é o valor da variável local";
    next();
};