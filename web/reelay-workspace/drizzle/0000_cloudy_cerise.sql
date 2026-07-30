CREATE TABLE `reelay_workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`project_name` text NOT NULL,
	`active_canvas_id` text NOT NULL,
	`payload` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
