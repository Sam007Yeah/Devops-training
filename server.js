const http = require("http");

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";

function createServer() {
    return http.createServer((req, res) => {
        console.log(`${req.method} ${req.url}`);

        if (req.url === "/health") {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                status: "UP"
            }));

            return;
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Hello from my DevOps application!",
            environment: APP_ENV
        }));
    });
}

if (require.main === module) {
    const server = createServer();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { createServer };