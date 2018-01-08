INSERT INTO `users` (`id`, `id_group`, `email`, `hpassword`, `name`, `surname`, `created`, `updated`) VALUES
(1, 1, 'carlo.perassi@something.com', '$2a$10$95DNBRtlP8Nthw/Thdc6iePhgaw/MZ/ik4o3a4hwUHX6/B3mLwnae', 'Carlo', 'Perassi', '2018-01-04 00:00:00', NULL); -- Prova123!

INSERT INTO `users_groups` (`id`, `name`) VALUES
(1, 'customers');
