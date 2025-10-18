PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_students_courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_id` integer NOT NULL,
	`student_id` integer NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_students_courses`("id", "course_id", "student_id", "updated_at", "created_at", "deleted_at") SELECT "id", "course_id", "student_id", "updated_at", "created_at", "deleted_at" FROM `students_courses`;--> statement-breakpoint
DROP TABLE `students_courses`;--> statement-breakpoint
ALTER TABLE `__new_students_courses` RENAME TO `students_courses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;