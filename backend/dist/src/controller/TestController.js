export const healthCheck = (req, res, next) => {
    // res.end("Hello World")
    res.json({
        data: "Health OK",
        message: "Success",
        meta: null,
    });
};
//# sourceMappingURL=TestController.js.map