import Pokemon from "../models/pokemon.js";
import PokemonAttack from "../models/pokemonAttack.js";
import {where} from "sequelize";

export async function listPokemons() {
    return await Pokemon.findAll();
}
