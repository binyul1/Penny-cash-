const AuthCheck = () => {
    return (req, res, next) => {
        console.log("i am at middleware");
        next();
    };
};
export default AuthCheck;
//# sourceMappingURL=Auth.js.map