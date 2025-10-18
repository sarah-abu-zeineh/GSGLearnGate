import React from "react";

interface IProps {
  information: string;
  details: string;
  entryRequirements: string;
  description: string;
}

const Information = ({
  information,
  details,
  entryRequirements,
  description,
}: IProps) => {
  return (
    <div data-testid="information-component">
      {information === "aboutCourse" ? (
        <div
          className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10"
          data-testid="about-course-section"
        >
          <h2 className="text-3xl font-bold" data-testid="about-course-title">
            About Course
          </h2>
          <p className="mt-2.5" data-testid="about-course-description">
            {description}
          </p>
        </div>
      ) : information === "courseDetails" ? (
        <div
          className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10"
          data-testid="course-details-section"
        >
          <h2 className="text-3xl font-bold" data-testid="course-details-title">
            Course Details
          </h2>
          <p className="mt-2.5" data-testid="course-details-description">
            {details}
          </p>
        </div>
      ) : information === "entryRequirement" ? (
        <div
          className="md:w-[750] max-md:px-3 lg:w-[970] xl:w-[1170] m-auto mt-10 mb-10"
          data-testid="entry-requirement-section"
        >
          <h2
            className="text-3xl font-bold"
            data-testid="entry-requirement-title"
          >
            Entry Requirement
          </h2>
          <p
            className="mt-2.5"
            data-testid="entry-requirement-description"
          >
            {entryRequirements}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Information;
