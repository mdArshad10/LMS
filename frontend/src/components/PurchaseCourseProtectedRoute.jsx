import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApiSlice";
import { Navigate, useParams } from "react-router-dom";

export const PurchasedCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);
  if (isLoading) return <p>loading...</p>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
