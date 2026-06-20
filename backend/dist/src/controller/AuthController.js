class AuthController {
    constructor() {
        this.ogin = async (req, res, next) => {
            try {
                res.json({
                    data: {
                        accessToken: "",
                        refreshToken: "",
                    },
                    message: "Login success",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getUserDetailById = async (req, res, next) => {
            // this function or route is only accessed by loggedin User =>
            try {
                const params = req.params;
                const query = req.query;
                const data = {
                    id: params.userId,
                    query: query
                };
                res.json({
                    data: data,
                    message: "User Detail",
                    meta: null,
                });
            }
            catch (exceptation) {
                next(exceptation);
            }
        };
    }
}
export default AuthController;
//# sourceMappingURL=AuthController.js.map