exports.get404 = (req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404;
    next(error);
}

exports.get500 = (req, res, next) => {
    const error = new Error('Server error');
    const data = error.data;
    res.status(err.statusCode || 500);
    res.json({
        error: {
            message: error.message,
            data: data,
        },
    });
};