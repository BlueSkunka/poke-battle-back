export function pingRoutes(app) {
    app.get("/ping", async(request, reply) => {
        reply.send("pong");
    })
}