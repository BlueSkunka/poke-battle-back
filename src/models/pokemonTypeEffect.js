import {sequelize} from "../bdd.js";
import {DataTypes} from "@sequelize/core";
import PokemonType from "./pokemonType.js";

const PokemonTypeEffect = sequelize.define("pokemon_type_attack", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    ratio: {
        type: DataTypes.DECIMAL(2, 2)
    }
})

PokemonTypeEffect.belongsTo(PokemonType, {
    targetKey: 'id',
    foreignKey: 'type_attack',
    as: 'type_one'
})
PokemonTypeEffect.belongsTo(PokemonType, {
    targetKey: 'id',
    foreignKey: 'type_pokemon',
    as: 'type_two'
})

export default PokemonTypeEffect;