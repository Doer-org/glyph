CREATE TABLE `comments` (
    `id`         VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `user_id`  VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `glyph_id`      VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `contents`    VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `created_at` DATETIME COLLATE utf8mb4_bin NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;