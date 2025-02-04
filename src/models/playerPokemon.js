import {sequelize} from "../bdd.js";
import {DataTypes} from "@sequelize/core";
import User from "./users.js";
import Pokemon from "./pokemon.js";
import PokemonAttack from "./pokemonAttack.js";

const PlayerPokemon = sequelize.define("player_pokemon", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
})

PlayerPokemon.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'player',
    as: 'owner'
})
PlayerPokemon.belongsTo(Pokemon, {
    targetKey: 'id',
    foreignKey: 'pokemon',
    as: 'pokemon_species'
})
PlayerPokemon.belongsTo(PokemonAttack, {
    targetKey: 'id',
    foreignKey: 'attack_one',
    as: 'attack_first_slot'
})
PlayerPokemon.belongsTo(PokemonAttack, {
    targetKey: 'id',
    foreignKey: 'attack_two',
    as: 'attack_second_slot'
})
PlayerPokemon.belongsTo(PokemonAttack, {
    targetKey: 'id',
    foreignKey: 'attack_three',
    as: 'attack_third_slot'
})
PlayerPokemon.belongsTo(PokemonAttack, {
    targetKey: 'id',
    foreignKey: 'attack_four',
    as: 'attack_fourth_slot'
})

export default PlayerPokemon;