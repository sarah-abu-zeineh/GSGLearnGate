"use client";

import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import Loader from "../Shared/Loader";
import SelectCourse from "../Dropdowns/SelectCourse";
import TempPagination from "../Pagination/TempPagination";
import useCoMonitorAnnouncements from "@/hooks/useCoMonitorAnnouncements";

interface IProps {
  coMonitorCoursesList: { courseId: number; courseName: string }[] | null;
}

export default function AnnouncementsTableByCoMonitor({
  coMonitorCoursesList,
}: IProps) {
  const {
    announcements,
    isLoading,
    courseId,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
    totalPages,
  } = useCoMonitorAnnouncements();

  if (isLoading) {
    return <Loader message="Loading data..." data-testid="loader" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="co-monitor-announcements-container">
      <div className="mb-8" data-testid="course-select-wrapper">
        <div className="max-w-xs">
          <SelectCourse
            options={coMonitorCoursesList}
            value={courseId}
            appendSearchParams={true}
            data-testid="select-course-dropdown"
          />
        </div>
      </div>

      {announcements && announcements.length > 0 ? (
        <div data-testid="announcements-list-wrapper">
          <ul className="space-y-4" data-testid="announcements-list">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="transform transition-all duration-200 hover:-translate-y-1"
                data-testid={`announcement-item-${announcement.id}`}
              >
                <AnnouncementCard
                  createdAt={announcement.createdAt || "unknown date"}
                  description={announcement.description}
                  title={announcement.title}
                  data-testid={`announcement-card-${announcement.id}`}
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end" data-testid="pagination-wrapper">
            <TempPagination
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
              data-testid="temp-pagination"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12" data-testid="no-announcements">
          <p className="text-gray-500 text-lg italic" data-testid="no-announcements-text">
            No announcements to view
          </p>
        </div>
      )}
    </div>
  );
}
