"use client";
import { Course, newAnnouncements } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  announcements: newAnnouncements[] | null;
  courses: Course[] | null;
}
const StudentCoursesAnnouncements = (props: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(
    props.announcements
  );
  const [, setSelectedCourse] = useState("");

  useEffect(() => {
    const courseParam = searchParams.get("course") || "";
    setSelectedCourse(courseParam);

    if (!courseParam || !props.announcements) {
      setFilteredAnnouncements(props.announcements);
    } else {
      const filtered = props.announcements.filter(
        (announcement) => announcement.courseTitle === courseParam
      );
      setFilteredAnnouncements(filtered);
    }
  }, [searchParams, props.announcements]);

  const handleCourseFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("course", value);
    } else {
      newParams.delete("course");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div data-testid="announcements-wrapper" className="flex flex-col gap-6 mb-10">
      <div className="space-y-2">
        <div className="flex flex-col justify-between gap-3">
          <label
            htmlFor="course-filter"
            className="text-sm font-medium text-gray-700"
          >
            Filter by Course
          </label>
          <select
            data-testid="announcement-course-filter"
            id="course-filter"
            onChange={handleCourseFilter}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Courses</option>
            {props.courses?.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredAnnouncements && filteredAnnouncements?.length >= 1 ? (
        filteredAnnouncements?.map((announcement) => (
          <div
            data-testid={`announcement-${announcement.id}`}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full"
            key={announcement.id}
          >
            <div
              data-testid={`announcement-header-${announcement.id}`}
              className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start"
            >
              <h3
                data-testid={`announcement-course-${announcement.id}`}
                className="text-2xl font-semibold text-[#FFA41F]"
              >
                {announcement.courseTitle}
              </h3>
              <h3
                data-testid={`announcement-title-${announcement.id}`}
                className="text-xl font-semibold text-[#E99375]"
              >
                {announcement.title}
              </h3>
              <p
                data-testid={`announcement-date-${announcement.id}`}
                className="text-[#E99375] my-2"
              >
                {new Date(announcement.createdAt!).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div
              data-testid={`announcement-body-${announcement.id}`}
              className="flex max-md:flex-col max-md:gap-8 justify-between "
            >
              <p
                data-testid={`announcement-description-${announcement.id}`}
                className="text-gray-700 flex-3"
              >
                {announcement.description}
              </p>
              <p
                data-testid={`announcement-postedBy-${announcement.id}`}
                className="text-gray-700 flex-1 text-end self-end"
              >
                Posted By: {announcement.postedBy}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div data-testid="no-announcements">There is no announcement to show</div>
      )}
    </div>
  );
};
export default StudentCoursesAnnouncements;
