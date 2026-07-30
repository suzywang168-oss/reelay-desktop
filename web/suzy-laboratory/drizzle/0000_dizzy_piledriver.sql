CREATE TABLE `contact_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`language` text DEFAULT 'zh' NOT NULL,
	`created_at` text NOT NULL
);
