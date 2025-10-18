DROP TABLE `appointments`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`started_at` text DEFAULT (current_timestamp) NOT NULL,
	`creator_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`deadline` integer NOT NULL,
	`points` integer,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "title", "description", "started_at", "creator_id", "course_id", "deadline", "points", "updated_at", "created_at", "deleted_at") SELECT "id", "title", "description", "started_at", "creator_id", "course_id", "deadline", "points", "updated_at", "created_at", "deleted_at" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;