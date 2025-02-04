import {sequelize} from "../bdd.js";
import {DataTypes} from "@sequelize/core";
import PokemonType from "./pokemonType.js";

const PokemonAttack = sequelize.define("pokemon_attack", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.CHAR
    },
    power: {
        type: DataTypes.INTEGER
    },
    pp: {
        type: DataTypes.INTEGER
    },
    precision: {
        type: DataTypes.INTEGER
    },
    effect: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    effectRate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    highCritical: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 50
    }
})

PokemonAttack.belongsTo(PokemonType, {targetKey: "id", foreignKey: "pokemonType"})

export default PokemonAttack;