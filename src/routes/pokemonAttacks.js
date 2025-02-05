import {listAttacksByPokemonId} from "../controllers/pokemonAttacks.js";

export function pokemonAttacksRoutes(app) {
    app.get(
        "/pokemonAttacks/pokemon/:pokemonId",
        {preHandler: [app.authenticate]},
        async (request, reply) => {
            reply.send(await listAttacksByPokemonId(request.params.pokemonId))
        }
    )
}