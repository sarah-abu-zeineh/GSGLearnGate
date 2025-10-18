import React from "react";
import { Course as CourseWithPresenter } from "@/types";
import CourseComponent from "../CourseComponent/CourseComponent";
import { getCoursesWithMonitor } from "@/services/courses";

const CollectionCourses = async () => {
  const courses: CourseWithPresenter[] = await getCoursesWithMonitor();

  return (
    <div
      className="py-20 md:w-[750] lg:w-[970] xl:w-[1170] m-auto"
      id="collection-courses-container"
    >
      <CourseComponent courses={courses} />
    </div>
  );
};

export default CollectionCourses;
