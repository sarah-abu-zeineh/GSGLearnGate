ALTER TABLE `attendance_records` DROP COLUMN `monitor_id`;--> statement-breakpoint
ALTER TABLE `attendance_records` DROP COLUMN `co_monitor_id`;--> statement-breakpoint
ALTER TABLE `attendance_records` DROP COLUMN `notes`;
PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

-- Create temporary table without notes column
CREATE TABLE attendance_records_temp (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES course_schedules(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id),
  status TEXT NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
  recorded_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Copy data (excluding notes)
INSERT INTO attendance_records_temp
SELECT 
  id, session_id, course_id, student_id, monitor_id, 
  co_monitor_id, status, recorded_by, created_at, updated_at, deleted_at
FROM attendance_records;

-- Drop old table
DROP TABLE attendance_records;

-- Rename temp table
ALTER TABLE attendance_records_temp RENAME TO attendance_records;

COMMIT;

PRAGMA foreign_keys=on;
