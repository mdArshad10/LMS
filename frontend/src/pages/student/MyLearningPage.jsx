import Course from "@/components/student/course";
import React from "react";

const MyLearningPage = () => {
  const isLoading = false;
  const myCourses = [1, 2, 3,4,5,6,7];
  return (
    <div className="max-w-4xl mx-auto mt-16 mb-10 px-4 md:px-0 pb-4">
      <h1 className="font-bold text-2xl pt-3">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myCourses.length === 0 ? (
          <p>No Course is purchase</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myCourses.map((course, index) => (
              <Course key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

export default MyLearningPage;
