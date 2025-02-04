import Pokemon from "../models/pokemon.js";

export async function getPokemonById(id) {
    return await Pokemon.findByPk(id)
}