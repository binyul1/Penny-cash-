import { config } from "dotenv";
config();
export const MongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB_NAME,
};
//# sourceMappingURL=app-env.js.map