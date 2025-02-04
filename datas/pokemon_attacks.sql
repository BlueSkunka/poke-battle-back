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

insert into pokemon_attacks (id, name, description, createdAt, updatedAt, pokemonType, type, power, pp, `precision`)
values
    (uuid(), 'Tackle', 'Tackle the ennemy', now(), now(), @normal, 'PHY', 35, 35, 95),
    (uuid(), 'Double-Edge', 'Dangerous tackle', now(), now(), @normal, 'PHY', 120, 15, 100),
    (uuid(), 'Tri Attack', 'Three type attack', now(), now(), @normal, 'SPE', 80, 10, 100),
    (uuid(), 'Weather Ball', 'Depend on climate change', now(), now(), @normal, 'SPE', 50, 10, 100);
