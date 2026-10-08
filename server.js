const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    console.log(`${req.method} ${req.url}`);

    // if (req.url === "/crash") {
    //     throw new Error("Something went terribly wrong");
    // }

    if (req.url === "/health") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "Healthy!"
        }));
        return;
    }

    if (req.url === "/env") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            env: process.env.APP_ENV
        }));
        return;
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        message: "Hello from my DevOps application!"
    }));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

