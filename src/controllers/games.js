import Game from "../models/games.js";
import generateJoiningCode from "../services/gameService.js";

export async function createGame(userId) {
	if (!userId) {
		return { error: "L'identifiant du joueur est manquant" };
	}
	const joiningCode = await generateJoiningCode();
	const game = await Game.create({ creator: userId, joiningCode: joiningCode });

	return { game: game };
}

/**
 * Déconnecte un joueur de la partie depuis le lobby
 * Si le joueur est le créateur, la partie sera supprimée
 * Sinon met les données du joueur2 à null
 * @param gameId Identifiant de la partie
 * @param playerId identifiant du joueur ayant quitté la partie
 * @returns {Promise<void>}
 */
export async function disconnectGame(gameId, playerId) {
	const game = await Game.findByPk(gameId)

	if (null == game) {
		return;
	}

	// Si l'hôte qui le lobby : suppression de la partie
	if (game.dataValues.creator === playerId) {
		game.destroy()
	} else {
		// Sinon c'est le joueur 2 qui a quitté
		await game.setPlayer2(null)
		game.save()
	}
}

export async function updateGame(request) {
	const userId = request.body.userId;

	if (request.params.length < 2) {
		return { error: "Il manque des paramètres" };
	}
	const { action, gameId } = request.params;
	if (!userId) {
		return { error: "L'identifiant du joueur est manquant" };
	} else if (!gameId) {
		return { error: "L'identifiant de la partie est manquant" };
	}
	const game = await Game.findByPk(gameId);
	if (!game) {
		return { error: "La partie n'existe pas." };
	}

	if (game.dataValues.state == "finished") {
		return { error: "Cette partie est déjà terminée !" };
	}

	switch (action) {
		case "join":
			if (game.dataValues.player != null) {
				return { error: "Il y a déjà 2 joueurs dans cette partie !" };
			}
			if (game.dataValues.state != "pending") {
				return { error: "Cette partie n'est plus en attente." };
			}
			await game.setPlayer2(userId);
			break;
		case "start":
			//update state
			game.state = "playing";

			break;
		case "finish":
			game.state = "finished";
			if (!request.body.score) {
				return { error: "Le score est manquant." };
			}
			game.winnerScore = request.body.score;
			game.winner = request.body.winner;
			break;
		default:
			return { error: "Action inconnue" };
	}
	game.save();
	return game;
}

export async function fetchGame(request) {
	if (request.params.length < 2) {
		return { error: "Il manque des paramètres" };
	}

	const {gameId, userId} = request.params;

	const game = await Game.findByPk(gameId);

	if (game.dataValues.player != userId && game.dataValues.creator != userId) {
		return {error: "Invalid player tried to fetch game data"}
	}

	return game;
}

export async function listGame() {
	return await Game.findAll();
}
