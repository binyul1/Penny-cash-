import mongoose from "mongoose";
import { MongodbConfig } from "./app-env.js";
// connect the db 
(async () => {
    try {
        await mongoose.connect(MongodbConfig.url, {
            dbName: MongodbConfig.dbName,
            autoCreate: true,
            autoIndex: true
        });
        console.log("***MongoDB connected successfully!***");
    }
    catch (err) {
        console.log("***Error mongodb connection***");
        process.exit(1);
    }
})();
//# sourceMappingURL=mongodb.js.map