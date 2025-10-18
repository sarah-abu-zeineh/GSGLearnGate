import { db } from "..";
import { eq } from "drizzle-orm";
import {
  coMonitorAvailabilityTable,
  coursesTable,
  usersTable,
} from "../schema";
import { Course, User } from "@/types";

export async function updateCourse(
  id: number,
  data: Partial<Omit<Course, "id">>
): Promise<Course | null> {
  const [updated] = await db
    .update(coursesTable)
    .set(data)
    .where(eq(coursesTable.id, Number(id)))
    .returning();

  return updated ?? null;
}

export async function updateUser(
  id: number,
  data: Partial<Omit<User, "password" | "role">>
): Promise<User | null> {
  const [updated] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, Number(id)))
    .returning();
  return updated ?? null;
}

export async function bookAppointment(
  appointmentId: number,
  studentId: number
): Promise<boolean> {
  const [updated] = await db
    .update(coMonitorAvailabilityTable)
    .set({
      isBooked: true,
      bookedByStudentId: studentId,
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    })
    .where(eq(coMonitorAvailabilityTable.id, appointmentId))
    .returning();

  return !!updated;
}
