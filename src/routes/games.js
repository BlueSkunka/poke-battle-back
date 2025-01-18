import {createGame, fetchGame, updateGame} from "../controllers/games.js";
export function gamesRoutes(app) {
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
	//récupérer une partie
	app.get(
		"/game/:gameId/:userId",
		{ preHandler: [app.authenticate] },
		async (request, reply) => {
			reply.send(await fetchGame(request));
		}
	)
}
