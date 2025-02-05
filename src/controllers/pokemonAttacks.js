import {sequelize} from "../bdd.js";
import {QueryTypes} from "sequelize";

export async function listAttacksByPokemonId(pokemonId) {
    const query = `select pa.* from pokemon_attacks pa join pokemon_pokemon_attack ppa on pa.id = ppa.pokemonAttackId where ppa.pokemonId = '${pokemonId}'`;
    return await sequelize.query(query, {
        type: QueryTypes.SELECT,
        mapToModel: true
    })
}