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
('32f7b701-fe46-46af-985b-67a402e6f6b8', 'Gengar', 'gengar.png', 167, 117, 112, 182, 127, 162, now(), now(), @ghost, @poison),
('f8ca40b2-4d8f-4093-8c29-6db5e1cac9dc', 'Blastoise', 'blastoise.png', 186, 135, 152, 137, 157, 130, now(), now(), @water, null),
('70892aef-ece2-4ebe-9311-724fe196f33b', 'Charizard', 'charizard.png', 185, 136, 130, 161, 137, 152, now(), now(), @fire, @flying),
('a941a735-b40c-4b12-9978-9d4257605068', 'venusaur', 'venusaur.png', 187, 134, 135, 152, 152, 132, now(), now(), @grass, @poison),
('bebfbbb4-6eca-45ca-87a5-96c04bbcd30a', 'Pidgeot', 'pidgeot.png', 190, 132, 127, 122, 122, 153, now(), now(), @normal, @flying),
('eb986b4d-717c-430d-ab41-ba6cd9fc8af1', 'Dragonite', 'dragonite.png', 198, 186, 147, 152, 152, 132, now(), now(), @dragon, @flying),
('30cdd701-7389-479d-aef3-f8be28f0b96c', 'Jynx', 'jynx.png', 172, 102, 87, 167, 147, 147, now(), now(), @ice, @psychic),
('4d40fcf1-144e-45b6-a0c6-eb8d2339b0f9', 'Primeape', 'primeape.png', 172, 157, 112, 112, 122, 147, now(), now(), @fighting, null),
('f72af4bb-6d50-4739-ba81-8382609e76da', 'Alakazam', 'alakazam.png', 162, 102, 97, 187, 147, 172, now(), now(), @psychic, null);
