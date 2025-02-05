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

set @sacha_gengar = 'dbd2173a-6cbb-43c5-891b-86d1f4e8ab9a';
set @sacha_char = '83f83f59-15ec-4c79-8056-303b15ac0ddd';
set @sacha_prime = 'c4365fd8-5296-4fd0-8d58-b39792de387e';
set @ondine_bla = '4cd0534e-524d-436c-994b-32f8a8116040';
set @ondine_dra = 'f1bff478-2677-4bcc-8b3a-619f252dcc20';
set @ondine_jyn = '743519f2-38fd-4d4a-a99c-36de085578f6';

insert into player_pokemons (id, createdAt, updatedAt, player, pokemon, attack_one, attack_two, attack_three,
                             attack_four)
values (@sacha_gengar, now(), now(), @sacha, @gengar, @tackle, @doubleedge, @triattack, @weatherball),
       (@sacha_prime, now(), now(), @sacha, @primeape, @tackle, @doubleedge, @triattack, @weatherball),
       (@sacha_char, now(), now(), @sacha, @charizard, @tackle, @doubleedge, @triattack, @weatherball),
       (@ondine_bla, now(), now(), @ondine, @blastoise, @tackle, @doubleedge, @triattack, @weatherball),
       (@ondine_dra, now(), now(), @ondine, @dragonite, @tackle, @doubleedge, @triattack, @weatherball),
       (@ondine_jyn, now(), now(), @ondine, @jynx, @tackle, @doubleedge, @triattack, @weatherball);


insert into player_pokemon_teams (id, name, createdAt, updatedAt, owner, pokemon_one, pokemon_two, pokemon_three)
values ('17e88db4-75f3-4d1e-bda2-1ea914c026be', 'Sacha team', now(), now(), @sacha, @sacha_gengar, @sacha_char, @sacha_prime),
       ('1ebd483b-bf0a-447d-8237-bc4e9955be30', 'Ondine team', now(), now(), @ondine, @ondine_bla, @ondine_dra, @ondine_jyn);
