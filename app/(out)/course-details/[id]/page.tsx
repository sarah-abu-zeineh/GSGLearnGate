"use client";
import Header from "@/components/CourseDetails/Header/Header";
import Hero from "@/components/CourseDetails/Hero/Hero";
import Information from "@/components/CourseDetails/Information/Information";
import Navbar from "@/components/CourseDetails/Navbar/Navbar";
import Loader from "@/components/Shared/Loader";
import { getCourseWithMonitorById } from "@/services/courses";
import { CourseWithPresenter } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseWithPresenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [information, setInformation] = useState("aboutCourse");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseWithMonitorById(Number(id));
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        Course not found
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Hero course={course} />
      <Navbar information={information} setInformation={setInformation} />
      <Information
        information={information}
        details={course.details}
        entryRequirements={course.entryRequirements}
        description={course.description}
      />
    </div>
  );
};

export default CourseDetails;
