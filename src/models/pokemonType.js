import {sequelize} from "../bdd.js";
import {DataTypes} from "@sequelize/core";

const PokemonType = sequelize.define("pokemon_type", {
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
    }
})

export default PokemonType;