import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import PokemonType from "./pokemonType.js";
import PokemonAttack from "./pokemonAttack.js";

const Pokemon = sequelize.define("pokemon", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    sprite: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    statPV: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statATK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statDEF: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statSpeATK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statSpeDEF: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statVIT: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Pokemon.belongsToMany(PokemonType, {through: 'pokemon_pokemon_type'})
Pokemon.belongsToMany(PokemonAttack, {through: 'pokemon_pokemon_attack'})

export default Pokemon;