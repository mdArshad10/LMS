import Course from "@/components/student/Course";
import { CourseSkeleton } from "@/components/student/CourseSkeleton";
import Filter from "@/components/student/Filter";
import SearchResult from "@/components/student/SearchResult";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SearchCoursePage = () => {
  const [sortByPrice, setSortByPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");

  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");

  const isLoading = false;
  const courses = [1, 2, 3, 4, 5];
  const isEmpty = false;

  const handleFilterChanges = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-16">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">
          {" "}
          result of "{"javascript"}"
        </h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 font-bold italic">
            {"Frontend Developer"}
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChanges={handleFilterChanges} />
        <div className="flex-1 ">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            courses.map((course, index) => <SearchResult key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCoursePage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-gray-200">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};
