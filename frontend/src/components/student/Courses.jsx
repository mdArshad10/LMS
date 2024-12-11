import Course from "./Course";
import { CourseSkeleton } from "./CourseSkeleton";
import { useGetAllPublishedCoursesQuery } from "@/features/api/courseApiSlice";

const Courses = () => {
  const { data, isLoading, isError } = useGetAllPublishedCoursesQuery();

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isError ? (
            <p>Something wrong with fetching data </p>
          ) : (
            data.course.map((course, index) => (
              <Course course={course} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
