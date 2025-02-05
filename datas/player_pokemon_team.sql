set @sacha = (select id from users where id = 'PALSAC');
set @ondine = (select id from users where id = 'AZUOND');

set@gengar = (select id from pokemons where name = 'Gengar');
set@primeape = (select id from pokemons where name = 'Primeape');
set@charizard = (select id from pokemons where name = 'Charizard');
set@blastoise = (select id from pokemons where name = 'Blastoise');
set@dragonite = (select id from pokemons where name = 'Dragonite');
set@jynx = (select id from pokemons where name = 'Jynx');

set @tackle = (select id from pokemon_attacks where name = 'Tackle');
set @doubleedge = (select id from pokemon_attacks where name = 'Double-Edge');
set @triattack = (select id from pokemon_attacks where name = 'Tri Attack');
set @weatherball = (select id from pokemon_attacks where name = 'Weather Ball');

# insert into player_pokemons (id, createdAt, updatedAt, player, pokemon, attack_one, attack_two, attack_three,
#                              attack_four)
# values (uuid(), now(), now(), @sacha, @gengar, @tackle, @doubleedge, @triattack, @weatherball),
#        (uuid(), now(), now(), @sacha, @primeape, @tackle, @doubleedge, @triattack, @weatherball),
#        (uuid(), now(), now(), @sacha, @charizard, @tackle, @doubleedge, @triattack, @weatherball),
#        (uuid(), now(), now(), @ondine, @blastoise, @tackle, @doubleedge, @triattack, @weatherball),
#        (uuid(), now(), now(), @ondine, @dragonite, @tackle, @doubleedge, @triattack, @weatherball),
#        (uuid(), now(), now(), @ondine, @jynx, @tackle, @doubleedge, @triattack, @weatherball);

set @sacha_gengar = (select id from player_pokemons where id = '27aa9ee6-e376-11ef-83ff-00155d8c27b0');
set @sacha_char = (select id from player_pokemons where id = '27aabb2c-e376-11ef-83ff-00155d8c27b0');
set @sacha_prime = (select id from player_pokemons where id = '27aabc9e-e376-11ef-83ff-00155d8c27b0');
set @ondine_bla = (select id from player_pokemons where id = '27aabd20-e376-11ef-83ff-00155d8c27b0');
set @ondine_dra = (select id from player_pokemons where id = '27aabd80-e376-11ef-83ff-00155d8c27b0');
set @ondine_jyn = (select id from player_pokemons where id = '27aabddd-e376-11ef-83ff-00155d8c27b0');

insert into player_pokemon_teams (id, name, createdAt, updatedAt, owner, pokemon_one, pokemon_two, pokemon_three)
values (uuid(), 'Sacha team', now(), now(), @sacha, @sacha_gengar, @sacha_char, @sacha_prime),
       (uuid(), 'Ondine team', now(), now(), @ondine, @ondine_bla, @ondine_dra, @ondine_jyn);