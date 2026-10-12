const http = require("http");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "devops",
    password: process.env.DB_PASSWORD || "local_dev_password",
    database: process.env.DB_NAME || "devopsdb",
    connectionTimeoutMillis: 3000
});

function createServer() {
    return http.createServer(async (req, res) => {
        console.log(`${req.method} ${req.url}`);

        res.setHeader("Content-Type", "application/json");

        if (req.url === "/health") {
            res.writeHead(200);
            res.end(JSON.stringify({ status: "UP" }));
            return;
        }

        if (req.url === "/db") {
            try {
                const result = await pool.query(`
                    SELECT
                        current_database() AS database,
                        NOW() AS server_time
                `);

                res.writeHead(200);
                res.end(JSON.stringify({
                    status: "CONNECTED",
                    ...result.rows[0]
                }));
            } catch (error) {
                console.error("Database query failed:", error);
                res.writeHead(503);
                res.end(JSON.stringify({
                    status: "DATABASE_UNAVAILABLE"
                }));
            }
            return;
        }

        res.writeHead(200);
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