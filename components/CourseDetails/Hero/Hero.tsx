import { CourseWithPresenter } from "@/types";
import { CalendarDots } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { AlignLeft, User } from "phosphor-react";
import React from "react";

interface IProps {
  course: CourseWithPresenter;
}

const Hero = ({ course }: IProps) => {
  return (
    <div
      className="relative w-full h-[500]"
      data-testid="hero-container"
    >
      <Image
        src="/img/hero-background.jpg"
        fill
        objectFit="cover"
        alt="course image"
        data-testid="hero-background-image"
      />
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,.7)]"
        data-testid="hero-overlay"
      ></div>

      <div
        className="absolute z-30 md:w-[750] lg:w-[970] xl:w-[1170] left-1/2 -translate-x-1/2 bottom-16 text-white flex justify-between items-end max-lg:flex-col max-lg:items-start max-md:w-[95%] max-lg:gap-5"
        data-testid="hero-content"
      >
        <div className="flex-3" data-testid="hero-course-info">
          <p className="text-3xl font-bold mb-8" data-testid="hero-course-title">
            {course.title}
          </p>
          <p className="mb-8 max-lg:w-[90%]" data-testid="hero-course-description">
            {course.description}
          </p>
          <div
            className="flex items-center gap-11 max-lg:w-[90%] max-sm:flex-col max-sm:gap-1 max-sm:items-start"
            data-testid="hero-course-meta"
          >
            <p className="flex gap-2 items-center" data-testid="hero-instructor">
              <User size={16} /> Instructor: {course.presenterName}
            </p>
            <p className="flex gap-2 items-center" data-testid="hero-difficulty">
              <AlignLeft size={16} /> Difficult: {course.difficulty}
            </p>
            <p className="flex gap-2 items-center" data-testid="hero-duration">
              <CalendarDots size={16} /> Duration: {course.duration}
            </p>
          </div>
        </div>

        <div
          className="flex-1 text-center p-4 bg-[var(--vital-color)] text-black rounded-md max-lg:w-full"
          data-testid="hero-enroll-box"
        >
          <p className="mb-4 text-lg" data-testid="hero-seats">
            Seats are limited
          </p>
          <hr />
          <button
            className="mt-4 text-lg border-1 border-gray-400 w-full rounded-md py-1.5 bg-[#7777774f] cursor-pointer hover:shadow-md duration-7"
            data-testid="hero-enroll-button"
          >
            <Link href="/login" data-testid="hero-enroll-link">
              Enroll now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;