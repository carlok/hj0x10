SET FOREIGN_KEY_CHECKS=0;
DROP DATABASE IF EXISTS xxx_development;
CREATE DATABASE xxx_development DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE xxx_development;
-- not for development
-- GRANT USAGE ON *.* TO 'xxx_development'@'%' REQUIRE SSL;
-- GRANT ALL PRIVILEGES ON xxx_development.* TO 'xxx_development'@'%' WITH GRANT OPTION;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS users_groups;
CREATE TABLE users_groups (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(127) NOT NULL,

    UNIQUE KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_group INT UNSIGNED NOT NULL,

    email VARCHAR(127) NOT NULL,
    hpassword VARCHAR(255) NOT NULL,
    name VARCHAR(127) NOT NULL,
    surname VARCHAR(127) NOT NULL,
    created DATETIME,
    updated DATETIME,

    UNIQUE KEY (email),

    FOREIGN KEY (id_group) REFERENCES users_groups(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Restore integrity check flag
SET FOREIGN_KEY_CHECKS=1;
