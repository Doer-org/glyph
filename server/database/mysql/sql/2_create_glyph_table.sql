CREATE TABLE `glyphs` (
    `id`         VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `author_id`  VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `title`      VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `content`    VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `prev_glyph` VARCHAR(255) COLLATE utf8mb4_bin ,
    `next_glyph` VARCHAR(255) COLLATE utf8mb4_bin ,
    `status`     VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
    `created_at` DATE COLLATE utf8mb4_bin NOT NULL,
    `updated_at` DATE COLLATE utf8mb4_bin NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;