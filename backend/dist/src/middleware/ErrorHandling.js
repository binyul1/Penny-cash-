export const ErrorHandler = (error, req, res, next) => {
    let code = error.code || 500;
    let detail = error.details || error.detail || null;
    let message = error.message || "Internal App Error";
    //manipulating Mongodb error
    if (error.name && error.name === "MongoServerError") {
        if (+error.code === 11000) {
            code = 400;
            detail = {};
            // {email: 1} =>["email"]
            Object.keys(error.keyPattern).map((key) => {
                detail[key] = `${key} should be unique`;
            });
            message = "validation Failed";
        }
    }
    res.status(code).json({
        code: code,
        error: detail,
        message: message,
        status: false,
    });
};
//# sourceMappingURL=ErrorHandling.js.map