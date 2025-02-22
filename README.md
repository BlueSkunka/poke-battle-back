# PokeBattle

Bienvenue sur PokeBattl,e un jeu de combat Pokemon non fonctionnel 🤡

## Prérequis 
Les prérequis sont:
- Un serveur de base de données MySQL ou MariaDB
- Un serveur de mailing, en utilisant par exemple [https://hub.docker.com/r/dockage/mailcatcher](Dockage)

## Installation

Cloner les sources : 
- BackEnd: https://github.com/BlueSkunka/poke-battle-back/tree/master
- FrontEnd: https://github.com/BlueSkunka/react-game/tree/develop

Installer les dépendances pour chaque projet:
```bash
yarn
```

Modifier les informations de connexion à la base de données dans le fichier: 
- `poke-battle-back/.env` ou `poke-battle-back/src/bdd.js`

Modifier les informations de connexion au mailer (aurait dû être mis dans le fichier `.env`) depuis le fichier:
- `poke-battle-back/src/controllers/users.js` à la ligne 89 et 90

Exécuter les scripts SQL dans l'ordre suivant (situé dans le dossier `poke-battle-back/datas`:
- `players.sql`
- `pokemon_types.sql`
- `pokemons.sql`
- `pokemon_attacks.sql`
- `player_pokemon_team.sql`
- `games.sql` (optionnel, pour enrichir l'historique de partie des deux joueurs)

## Démarrage

Démarrer le serveur backend en premier puis l'application React grâce à la commande `npm run dev`, exécuté dans les dossiers respectifs. 
