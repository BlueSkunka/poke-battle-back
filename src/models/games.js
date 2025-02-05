import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import User from "./users.js";
import PlayerPokemonTeam from "./playerPokemonTeam.js";

const Game = sequelize.define("game", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	winnerScore: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	state: {
		type: DataTypes.ENUM("pending", "playing", "finished"),
		allowNull: false,
		defaultValue: "pending",
	},
	joiningCode: {
		type: DataTypes.CHAR,
		allowNull: true,
	},
	isPublic: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
});
Game.belongsTo(User, { targetKey: "id", foreignKey: "creator", as: "player1" });
Game.belongsTo(User, {
	allowNull: true,
	targetKey: "id",
	foreignKey: "player",
	as: "player2",
});
Game.belongsTo(User, {
	allowNull: true,
	targetKey: "id",
	foreignKey: "winner",
	as: "winPlayer",
});
Game.belongsTo(PlayerPokemonTeam, {
	targetKey: "id",
	foreignKey: "creatorTeam",
	as: "creatorPokemonTeam",
	allowNull: true
});
Game.belongsTo(PlayerPokemonTeam, {
	targetKey: "id",
	foreignKey: "playerTeam",
	as: "playerPokemonTeam",
	allowNull: true
});

export default Game;
