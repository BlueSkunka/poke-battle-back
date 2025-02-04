import {sequelize} from "../bdd.js";
import {DataTypes} from "@sequelize/core";
import User from "./users.js";
import PlayerPokemon from "./playerPokemon.js";

const PlayerPokemonTeam = sequelize.define("player_pokemon_team", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
})

PlayerPokemonTeam.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'owner',
    as: 'team_owner'
})

PlayerPokemonTeam.belongsTo(PlayerPokemon, {
    targetKey: 'id',
    foreignKey: 'pokemon_one',
    as: 'pokemon_first'
})
PlayerPokemonTeam.belongsTo(PlayerPokemon, {
    targetKey: 'id',
    foreignKey: 'pokemon_two',
    as: 'pokemon_second'
})
PlayerPokemonTeam.belongsTo(PlayerPokemon, {
    targetKey: 'id',
    foreignKey: 'pokemon_three',
    as: 'pokemon_third'
})

export default PlayerPokemonTeam