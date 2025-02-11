import {createGame, fetchGame, fetchGameByUser, listGame, updateGame} from "../controllers/games.js";
export function gamesRoutes(app) {
	// liste des parties joignables
	app.get(
		"/games",
		{ preHandler: [app.authenticate] },
		async (request, reply) => {
				reply.send(await listGame());
		}
	)
	//création d'un jeu
	app.post(
		"/game",
		{ preHandler: [app.authenticate] },
		async (request, reply) => {
			reply.send(await createGame(request.body.userId));
		}
	);
	//rejoindre un jeu
	app.patch(
		"/game/:action/:gameId",
		{ preHandler: [app.authenticate] },
		async (request, reply) => {
			reply.send(await updateGame(request));
		}
	);
	// Récupérer la liste des parties passées pour un joueur
	app.get(
		"/game/:userId",
		{preHandler: [app.authenticate]},
		async (request, reply) => {
			reply.send(await fetchGameByUser(request))
		}
	)
	//récupérer une partie
	app.get(
		"/game/:gameId/:userId",
		{ preHandler: [app.authenticate] },
		async (request, reply) => {
			reply.send(await fetchGame(request));
		}
	)
}
