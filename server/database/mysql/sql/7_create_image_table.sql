CREATE TABLE `images` (
  `id` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `img`           LONGBLOB     NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;