import http from "http";
import "./src/config/app-env.js";
import app from "./src/app.js";
const server = http.createServer(app);
//listen
const HOST = "127.0.0.1";
const PORT = 9005;
server.listen(PORT, HOST, () => {
    console.log("Server is running " + PORT);
    console.log("TO disconnect server, press CTRL+C");
});
server.on("error", (err) => {
    console.error(err);
    console.log("Server error", err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map