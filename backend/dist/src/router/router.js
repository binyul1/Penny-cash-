import { Router, } from "express";
const router = Router();
router.get("/", (req, res, next) => {
    // res.end("Hello World")
    res.json({
        data: "Health OK",
        message: "Success",
        meta: null,
    });
});
router.post("/auth/login", (req, res, next) => {
    res.json({
        data: {
            accessToken: "",
            refreshToken: "",
        },
        message: "Message",
        meta: null,
    });
});
router.get("/user/:userId", (req, res, next) => {
    const params = req.params;
    const data = {
        userId: params.userId,
    };
    res.json({
        data: data,
        message: "User fetched",
        meta: null,
    });
});
export default router;
//# sourceMappingURL=router.js.map