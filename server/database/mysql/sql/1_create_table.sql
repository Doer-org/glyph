CREATE TABLE `sortings` (
 `id` int unsigned NOT NULL COMMENT 'ID',
 `memo` varchar(255) NOT NULL COMMENT '請求メモ',
 PRIMARY KEY (`id`)
) COMMENT='仕分け';