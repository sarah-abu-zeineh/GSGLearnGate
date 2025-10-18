ALTER TABLE `tasks` RENAME COLUMN "grade" TO "points";--> statement-breakpoint
ALTER TABLE `attendance_records` ADD `monitor_id` integer REFERENCES monitors(id);--> statement-breakpoint
ALTER TABLE `attendance_records` ADD `co_monitor_id` integer REFERENCES co_monitors(id);