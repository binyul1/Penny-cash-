export const ErrorHandler = (error, req, res, next) => {
    let code = error.code || 500;
    let detail = error.details || error.detail || null;
    let message = error.message || "Internal App Error";
    res.status(code).json({
        code: code,
        error: detail,
        message: message,
        status: false
    });
};
//# sourceMappingURL=ErrorHandling.js.map