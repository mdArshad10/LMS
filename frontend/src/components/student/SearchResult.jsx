import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const SearchResult = ({
  course = {
    _id: "",
    title: "",
    instructor: "",
    description: "",
    courseThumbnail: {
      public_id: "akf;laksdfl;aksd",
      url: "https://i.pinimg.com/enabled_lo_mid/736x/4b/11/82/4b118249da28ce01fd6fb7d413ecbfab.jpg",
    },
    price: 0,
    category: "",
    level: "",
    duration: "",
    students: [],
    reviews: [],
  },
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail?.url}
          alt={course.title}
          className="h-32 w-full md:w-56 object-contain rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">course Title</h1>
          <p className="text-sm text-gray-600">Sub Title: </p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold"> {"Md Arshad"}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">Medium</Badge>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
