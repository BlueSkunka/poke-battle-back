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
    }

})

PokemonAttack.belongsTo(PokemonType, {targetKey: "id", foreignKey: "pokemonType"})

export default PokemonAttack;