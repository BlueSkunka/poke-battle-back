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

## Comptes utilisateurs
Email: sacha@yopmail.com
Email: ondine@yopmail.com
Mot de passe pour les deux comptes: Password02+

## Informations

- Connexion et inscription fonctionnel ✔️
- Envoie du mail fonctionnel ✔️
- Validation du compte oublié ❎
- Contrôle des saisies formulaire fonctionnelles avec Yup ✔️
- Création d'une partie fonctionnelle ✔️
- Rejoindre une partie fonctionnelle (hôte prévenus par un message toast) ✔️
- Statut "Joueur prêt" fonctionnelle ✔️
- Bouton démarrer la partie fonctionnel ✔️
- Partie non fonctionnelle ❎
- Abandon de la partie et écran de victoire / défaite ✔️
- Système de création d'une équipe pour un joueur non fonctionnel ❎
- Quitter / Rejoindre une partie en cours non fonctionnel ❎
- Historique des parties du joueur ✔️
- Application responsive ✔️
- Design sympa ✔️ (j'espère)
- Application non en ligne ❎

⚠️ Le lancement de la partie n'est fonctionnelle qu'avec les comtpes pré crées car la partie emande à ce que le joueur choisisse une équipe Pokémon, fonctionnalité qui n'a pas aboutis ⚠️

## Avis
J'aurais dû prendre le temps d'explorer la gestion de store sur React car j'ai eu trop de problèmes avec la gestion des fonctions callback pour les évènements Socket, ce qui m'a fait perdre beaucoup de temps et de motivation. 
J'ai essayé de suivre une architecture atomic design mais ça ne me correspond pas. 
Tout de même une bonne appréciation de React avec l'utilisation de composant générique et réutilisable facilement. 
Quelques difficultés à typer correctement les composants et contexte au début mais super clean une fois pris en main. 
Mauvaises compréhension avec le cycle de vie d'un composant React et la gestion des states. 

