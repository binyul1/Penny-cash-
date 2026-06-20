class CashReqController {
    constructor() {
        this.createCash = async (req, res, next) => {
            try {
                const data = req.body;
                const file = req.file;
                if (file) {
                    return;
                }
                res.json({
                    file: file,
                    data: data,
                    //files: files
                });
            }
            catch (exceptation) {
                next(exceptation);
            }
        };
    }
}
export default CashReqController;
//# sourceMappingURL=CashReqController.js.map