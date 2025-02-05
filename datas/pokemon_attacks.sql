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
    ('cc071f40-2a6e-43d4-84ad-e897e20377dd', 'Tackle', 'Tackle the ennemy', now(), now(), @normal, 'PHY', 35, 35, 95),
    ('10efc1c8-45ab-4742-8459-1a0fdffb36fd', 'Double-Edge', 'Dangerous tackle', now(), now(), @normal, 'PHY', 120, 15, 100),
    ('6a30f079-f82a-49bb-a967-3763cb5a60cc', 'Tri Attack', 'Three type attack', now(), now(), @normal, 'SPE', 80, 10, 100),
    ('1bf96713-a9a2-45b8-bb67-28d515be22c3', 'Weather Ball', 'Depend on climate change', now(), now(), @normal, 'SPE', 50, 10, 100);
