CREATE TABLE `files_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`size` int NOT NULL,
	`url` text NOT NULL,
	`extension` enum('image','media','document','other'),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `files_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `owner_id_index` ON `files_table` (`owner_id`);