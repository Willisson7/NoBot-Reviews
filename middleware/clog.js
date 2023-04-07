const clog = (req, res, next) => {
    const fbCyan = '\x1b[36m';
    switch (req.method) {
      
        case 'GET': {
            console.info(`📗 ${fbCyan}${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.log (`📘 ${fgCyan}${req.method} request to ${req.path}`);
            break;
        default:
            console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
    }
        
    next();
};

exports.clog = clog;