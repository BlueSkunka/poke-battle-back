import {listPokemons} from "../controllers/pokemons.js";

export function pokemonsRoutes(app) {
    app.get(
        "/pokemons",
        {preHandler: [app.authenticate]},
        async (request, reply) => {
            reply.send(await listPokemons())
        }
    )
}