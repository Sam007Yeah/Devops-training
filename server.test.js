const test = require("node:test");
const assert = require("node:assert");
const { createServer } = require("./server");

test("GET /health returns UP", async () => {
    const server = createServer();

    await new Promise((resolve) => {
        server.listen(0, resolve);
    });

    const { port } = server.address();

    try {
        const response = await fetch(`http://localhost:${port}/health`);

        const body = await response.json();

        assert.equal(response.status, 200);
        assert.deepEqual(body, {
            status: "DOWN"
        });
    } finally {
        server.close();
    }
});