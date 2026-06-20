class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
            try {
                const credentials = req.body;
                res.json({
                    data: credentials,
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
                    query: query,
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
        this.getLoggedInUserDetail = async (req, res, next) => {
            res.json({
                data: {
                    user: {
                        id: 1,
                    },
                },
                message: "User Detail",
                meta: null
            });
        };
    }
}
export default AuthController;
//# sourceMappingURL=AuthController.js.map