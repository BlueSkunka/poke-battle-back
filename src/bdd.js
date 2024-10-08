import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";

dotenv.config();

/**
 * Connexion à la base de données
 */
export const sequelize = new Sequelize({
	dialect: MySqlDialect,
	database: process.env.DB_NAME || "poke_battle",
	user: process.env.DB_USER || "pokebattle",
	password: process.env.DB_PASSWORD || "pokebattle",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT) || 3306,
});
