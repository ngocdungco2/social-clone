INSERT INTO `log` (`id`, `userId`, `timeLog`, `status`, `postID`) VALUES (166, 22, '2024-05-03 14:16:21', 'Has Uploaded', NULL);
INSERT INTO `posts` (`id`, `desc`, `img`, `userId`, `createdAt`, `verified`) VALUES (42, 'asdasd', '', 22, '2024-05-03 14:16:21', 1);
INSERT INTO `posts` (`id`, `desc`, `img`, `userId`, `createdAt`, `verified`) VALUES (43, '123123', '', 22, '2024-05-03 14:23:48', 1);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (1, 19, 15);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (4, 20, 15);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (5, 15, 20);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (6, 15, 19);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (9, 13, 20);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (10, 13, 21);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (11, 21, 20);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (12, 20, 13);
INSERT INTO `relationships` (`id`, `followerUserId`, `followedUserId`) VALUES (16, 22, 19);
INSERT INTO `roles` (`roleId`, `roleName`) VALUES (0, 'user');
INSERT INTO `roles` (`roleId`, `roleName`) VALUES (1, 'admin');
INSERT INTO `roles` (`roleId`, `roleName`) VALUES (2, 'manager');
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (12, 'admin', 'admin@gmail.com', '$2a$10$v4Rs.THYDo1VAiOg5OW7FeWSD2QiwCN0xFgTHv9q8wz0diQ9EyH0K', 'admin', '1685365581354IMG_0123.jpeg', '1685365550290d65b4820b42f2c6aa5ec26d8b4860bd8.jpeg', NULL, NULL, 1);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (13, 'manager', 'manager@gmail.com', '$2a$10$pPJ9ijtXYEQG9ZAj4b2viOiZOwdGCvh3W0Hs2eIv4nVrZyBKMNTAi', 'manager', 'defaultcover.png', 'default.png', 'Ha Noi', NULL, 2);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (15, 'manager2', 'manager2@gmail.com', '$2a$10$IR7uuqh5SjvmKV.6mPjYeOiFsyTuaCUMD6Tv8sIXnAO0mpZNn35QW', 'manager2', 'defaultcover.png', 'default.png', 'Ha Noi', NULL, 2);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (16, 'user', 'user@gmail.com', '$2a$10$UUWFtGx4l/IFrMKDVKrhReXd6GO97w6hnJKg5rvTLBrRPmZzHQx7e', 'user', 'defaultcover.png', '1685366050615c869f75f2c1fd231e99cef87dcc849ae.jpeg', NULL, NULL, 0);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (18, 'manager3', 'manager3@gmail.com', '$2a$10$4MQxPR/eYYXYSIFFcGYku.qcCYV4pqWE9CFojaxCIJNriIY1iWhgy', 'manager3', 'defaultcover.png', 'default.png', NULL, NULL, 2);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (19, 'khanh', 'khanh@gmail.com', '$2a$10$ozwuZ/NoQsruGrEPFgBq3ue/dMXeRMy2Lvauf/YShk3crMIvfNDb2', 'Khanh', 'defaultcover.png', 'default.png', 'Ha Noi', NULL, 0);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (20, 'khanhqaz', 'khanh298454@gmail.com', '$2a$10$b.KrOKoaGhpWld/2xb.SFep1Wp/suATX195B5siCedqO2Oeufqfme', 'KHANH DZAI', 'defaultcover.png', 'default.png', 'VIet Nam', 'abc.www.epu.com', 0);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (21, 'tuan123', 'tuan@gmail.com', '$2a$10$Nj4n1uoYowjK/.wxZWzHCuSCQMe.1ZNPguY2dv8E5.C6PCTKXgd.K', 'TuanKhi', 'defaultcover.png', 'default.png', NULL, NULL, 0);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverPic`, `profilePic`, `city`, `website`, `roleId`) VALUES (22, 'dung', 'dung@gmail.com', '$2a$10$bn/HQN0eY6YQNwydZNvNb.RC1W9dn9vZSSmF6jE8GN93Raenpz1MW', 'dung', 'defaultcover.png', 'default.png', 'Ha Noi', NULL, 0);
