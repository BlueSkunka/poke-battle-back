import chalk from "chalk";
//pour fastify
import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import socketioServer from "fastify-socket.io";
//routes
import { usersRoutes } from "./routes/users.js";
import { gamesRoutes } from "./routes/games.js";
//bdd
import { sequelize } from "./bdd.js";
import {pingRoutes} from "./routes/ping.js";

import games from "./models/games.js";
import Game from "./models/games.js";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents.js";
import User from "./models/users.js";
import {disconnectGame, startGame} from "./controllers/games.js";
import pokemon from "./models/pokemon.js";
import pokemonAttack from "./models/pokemonAttack.js";
import pokemonType from "./models/pokemonType.js";
import playerPokemon from "./models/playerPokemon.js";
import pokemonTypeEffect from "./models/pokemonTypeEffect.js";
import playerPokemonTeam from "./models/playerPokemonTeam.js";
import {pokemonsRoutes} from "./routes/pokemons.js";
import {pokemonAttacksRoutes} from "./routes/pokemonAttacks.js";
//Test de la connexion
try {
	sequelize.authenticate();
	console.log(chalk.grey("Connecté à la base de données MySQL!"));
} catch (error) {
	console.error("Impossible de se connecter, erreur suivante :", error);
}

/**
 * API
 * avec fastify
 */
let blacklistedTokens = [];
const app = fastify();
//Ajout du plugin fastify-bcrypt pour le hash du mdp
await app
	.register(fastifyBcrypt, {
		saltWorkFactor: 12,
	})
	.register(cors, {
		origin: "*",
	})
	.register(socketioServer, {
		cors: {
			origin: "*"
		}
	})
	.register(fastifySwagger, {
		openapi: {
			openapi: "3.0.0",
			info: {
				title: "Documentation de l'API POKE BATTLE",
				description:
					"API développée pour un exercice avec React avec Fastify et Sequelize",
				version: "0.1.0",
			},
		},
	})
	.register(fastifySwaggerUi, {
		routePrefix: "/documentation",
		theme: {
			title: "Docs - POKE BATTLE API",
		},
		uiConfig: {
			docExpansion: "list",
			deepLinking: false,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	})
	.register(fastifyJWT, {
		secret: "arceuslecreateur",
	});
/**********
 * Routes
 **********/
app.get("/", (request, reply) => {
	reply.send({ documentationURL: "http://localhost:3000/documentation" });
});
// Fonction pour décoder et vérifier le token
app.decorate("authenticate", async (request, reply) => {
	try {
		const token = request.headers["authorization"].split(" ")[1];

		// Vérifier si le token est dans la liste noire
		if (blacklistedTokens.includes(token)) {
			return reply
				.status(401)
				.send({ error: "Token invalide ou expiré" });
		}
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});
//gestion utilisateur
usersRoutes(app,blacklistedTokens);
//gestion des jeux
gamesRoutes(app);
//gestion des routes de test
pingRoutes(app);
// Pokemons routes
pokemonsRoutes(app)
// Pokemon attacks routes
pokemonAttacksRoutes(app)

/**********
 * SOCKET
 **********/
app.io.on(PokeBattleSocketEvents.CONNECTION, (socket) => {
	console.log(`Joueur connecté : ${socket.id}`);

	socket.on(PokeBattleSocketEvents.DISCONNECT, () => {
		console.log(`Joueur déconnecté: ${socket.id}`)
	})

	socket.on(PokeBattleSocketEvents.TEST_EVENT, (data) => {
		console.log("receive test", data)
		socket.emit(PokeBattleSocketEvents.TEST_EVENT, {msg: "coucou"})
	})

	// Un joueur a créé une partie et il rejoint maintenant la room dédiée
	socket.on(PokeBattleSocketEvents.GAME_CREATE_ROOM, async (data) => {
		console.log("game create", socket.id, data)
		const game = await Game.findByPk(data.gameId)

		console.log("Creating socket room", game.dataValues.id)
		await socket.join(game.dataValues.id)
	})

	socket.on(PokeBattleSocketEvents.GAME_PLAYER_JOINING, async (data) => {
		console.log("Joining room", data)
		await socket.join(data.roomId)

		await socket.to(data.roomId).emit(PokeBattleSocketEvents.GAME_PLAYER_JOINED, {
			'player': data.userId,
			'gameId': data.roomId
		})
	})

	socket.on(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, async (data) => {
		console.log("Game player disconnect", data)

		await disconnectGame(data.gameId, data.playerId)

		socket.to(data.gameId).emit(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, {
			'gameId': data.gameId,
			'playerId': data.playerId
		})
	})

	socket.on(PokeBattleSocketEvents.GAME_PLAYER_READY, async (data) => {
		console.log('player is ready', data)

		socket.to(data.gameId).emit(PokeBattleSocketEvents.GAME_PLAYER_READY, {
			'gameId': data.gameId,
			'playerId': data.playerId
		})
	})

	socket.on(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, async (data) => {
		console.log('player is not ready', data)

		socket.to(data.gameId).emit(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, {
			'gameId': data.gameId,
			'playerId': data.playerId
		})
	})

	socket.on(PokeBattleSocketEvents.GAME_START, async (data) => {
		console.log("Game start", data)

		const game = await startGame(data.gameId)

		socket.nsp.to(data.gameId).emit(PokeBattleSocketEvents.GAME_START, {
			game: game
		})
	})
})

/**********
 * START
 **********/
const start = async () => {
	try {
		await sequelize
			.sync({ alter: true })
			.then(() => {
				console.log(chalk.green("Base de données synchronisée."));
			})
			.catch((error) => {
				console.error(
					"Erreur de synchronisation de la base de données :",
					error
				);
			});
		await app.listen({ port: 3000 });
		console.log(
			"Serveur Fastify lancé sur " + chalk.blue("http://localhost:3000")
		);
		console.log(
			chalk.bgYellow(
				"Accéder à la documentation sur http://localhost:3000/documentation"
			)
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
start();