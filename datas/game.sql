set @sacha = (select id from users where id = 'PALSAC');
set @ondine = (select id from users where id = 'AZUOND');

insert into games (id, winnerScore, state, createdAt, updatedAt, creator, player, winner, joiningCode, isPublic, creatorTeam, playerTeam)
values ('ee1edb7f-2781-4923-8eb0-5f4abee3899d', 0, 'finished', '2028-02-27 23:57:00', '2028-02-27 23:57:00', @sacha, @ondine, @sacha, 'azertyuiop', 0, null, null),
       ('2c6e57a5-2b46-4085-a358-d2ee5943d73a', 0, 'finished', '1977-08-06 23:44:49', '1977-08-06 23:44:49', @sacha, @ondine, @sacha, 'azertyuiop', 0, null, null),
       ('515b3b37-1b75-4064-8807-9860c52395a8', 0, 'finished', '1982-11-30 19:10:25', '1982-11-30 19:10:25', @sacha, @ondine, @ondine, 'azertyuiop', 0, null, null),
       ('daaa96c0-b5c5-48c8-bd19-1b70918281ac', 0, 'finished', '1981-02-07 08:23:17', '1981-02-07 08:23:17', @sacha, @ondine, @ondine, 'azertyuiop', 0, null, null),
       ('07b50634-42e4-4463-9b02-7cc803819bc2', 0, 'finished', '1988-05-23 22:35:41', '1988-05-23 22:35:41', @sacha, @ondine, @sacha, 'azertyuiop', 0, null, null);