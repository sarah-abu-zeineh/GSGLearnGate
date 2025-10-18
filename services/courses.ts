"use server";

import { deleteCourse } from "@/src/db/queries/delete";
import {
  insertCourse,
  insertCourseSchedule,
  insertStudentCourse,
} from "@/src/db/queries/insert";
import { Course, CourseSchedule, User } from "@/types";
import { updateCourse, updateUser } from "@/src/db/queries/update";
import {
  getStudentCountByCourse,
  getCoursesWithStudentCount,
  getAllCourses,
  getCoursesNamesByCoMonitor,
  getCoursesNamesByMonitor,
  getCourseById,
  getAllCoursesWithMonitors,
  getCourseWithMonitor,
  getStudentsListByCourseId,
  getCoursesWithStudentCounts,
  getCoursesWithStudentCountsByCoMonitor,
} from "@/src/db/queries/select";

export async function addStudentToCourse(studentId: number, courseId: number) {
  return await insertStudentCourse({ courseId, studentId });
}
export async function getMonitorCoursesNames(monitorId: number) {
  return await getCoursesNamesByMonitor(monitorId);
}

export async function fetchAllCourses() {
  return await getAllCourses();
}

export async function getCoMonitorCoursesNames(coMonitorId: number) {
  return await getCoursesNamesByCoMonitor(coMonitorId);
}
export async function getCourses(page: number, pageSize: number) {
  return await getCoursesWithStudentCount(page, pageSize);
}

export async function getStudentsCountPerCourse(courseId: number) {
  return await getStudentCountByCourse(courseId);
}

export async function addCourse(data: Omit<Course, "id">) {
  return await insertCourse(data);
}

export async function removeCourse(id: number) {
  return await deleteCourse(id);
}

export async function editCourse(id: number, data: Course) {
  return await updateCourse(id, data);
}

export async function getCourse(id: number) {
  return await getCourseById(id);
}

export async function editUser(
  id: number,
  data: Omit<User, "password" | "role">
) {
  return await updateUser(id, data);
}

export async function insertSchedule(data: Omit<CourseSchedule, "id">) {
  return await insertCourseSchedule(data);
}

export async function getCoursesWithMonitor() {
  return await getAllCoursesWithMonitors();
}

export async function getCourseWithMonitorById(id: number) {
  return await getCourseWithMonitor(id);
}
export async function getStudentsWithMonitorCorse(
  page: number,
  monitorId: number | undefined,
  coMonitorId: number | undefined,
  itemsPerPage: number = 10,
  courseId?: number | undefined
) {
  return await getStudentsListByCourseId(
    courseId,
    page,
    itemsPerPage,
    monitorId,
    coMonitorId
  );
}
export async function getMonitorTeachingStats(monitorId: number) {
  return await getCoursesWithStudentCounts(monitorId);
}

export async function getCoMonitorTeachingStats(coMonitorId: number) {
  return await getCoursesWithStudentCountsByCoMonitor(coMonitorId);
}
