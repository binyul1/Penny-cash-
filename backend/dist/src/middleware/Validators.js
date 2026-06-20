import z from "zod";
export const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            if (!data) {
                next({ code: 422, message: "Data not set." });
            }
            else {
                //validate
                await schema.parseAsync(data);
                next();
            }
        }
        catch (exceptation) {
            let errorBag = {};
            if (exceptation instanceof z.ZodError) {
                exceptation.issues.map((error) => {
                    const key = error.path[0];
                    errorBag[key] = error.message;
                });
            }
            next({ detail: errorBag, code: 400, message: "Validation Failed" });
        }
    };
};
//# sourceMappingURL=Validators.js.map