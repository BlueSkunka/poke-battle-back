set @ghost = (select id from pokemon_types where pokemon_types.name = 'Ghost');
set @poison = (select id from pokemon_types where pokemon_types.name = 'Poison');
set @water = (select id from pokemon_types where pokemon_types.name = 'Water');
set @fire = (select id from pokemon_types where pokemon_types.name = 'Fire');
set @flying = (select id from pokemon_types where pokemon_types.name = 'Flying');
set @grass = (select id from pokemon_types where pokemon_types.name = 'Grass');
set @normal = (select id from pokemon_types where pokemon_types.name = 'Normal');
set @dragon = (select id from pokemon_types where pokemon_types.name = 'Dragon');
set @psychic = (select id from pokemon_types where pokemon_types.name = 'Psychic');
set @ice = (select id from pokemon_types where pokemon_types.name = 'Ice');
set @fighting = (select id from pokemon_types where pokemon_types.name = 'Fighting');

insert into pokemons (id, name, sprite, statPV, statATK, statDEF, statSpeATK, statSpeDEF, statVIT, createdAt, updatedAt, type_primary, type_secondary)
values
(uuid(), 'Gengar', 'gengar.png', 167, 117, 112, 182, 127, 162, now(), now(), @ghost, @poison),
(uuid(), 'Blastoise', 'blastoise.png', 186, 135, 152, 137, 157, 130, now(), now(), @water, null),
(uuid(), 'Charizard', 'charizard.png', 185, 136, 130, 161, 137, 152, now(), now(), @fire, @flying),
(uuid(), 'venusaur', 'venusaur.png', 187, 134, 135, 152, 152, 132, now(), now(), @grass, @poison),
(uuid(), 'Pidgeot', 'pidgeot.png', 190, 132, 127, 122, 122, 153, now(), now(), @normal, @flying),
(uuid(), 'Dragonite', 'dragonite.png', 198, 186, 147, 152, 152, 132, now(), now(), @dragon, @flying),
(uuid(), 'Jynx', 'jynx.png', 172, 102, 87, 167, 147, 147, now(), now(), @ice, @psychic),
(uuid(), 'Primeape', 'primeape.png', 172, 157, 112, 112, 122, 147, now(), now(), @fighting, null),
(uuid(), 'Alakazam', 'alakazam.png', 162, 102, 97, 187, 147, 172, now(), now(), @psychic, null);