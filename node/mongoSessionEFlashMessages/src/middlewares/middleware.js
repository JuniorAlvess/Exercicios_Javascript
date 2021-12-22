exports.middlewareGlobal = (req, res, next) => {
    if(req.body.cliente) {
        console.log();
        console.log(`cliente: ${req.body.cliente}`);
        console.log();
    }

    next();
};