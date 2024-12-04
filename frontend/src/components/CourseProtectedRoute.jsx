import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApiSlice";
import React from "react";
import { useParams, Navigate } from "react-router-dom";

export const CourseProtectedRoute = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);
  return isLoading ? (
    <h1>Loading ...</h1>
  ) : data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};


