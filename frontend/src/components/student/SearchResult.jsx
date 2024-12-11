import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail?.url}
          alt={course.title}
          className="h-32 w-full md:w-56 object-contain rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle} </p>
          <p className="text-sm text-gray-700">
            Instructor:{" "}
            <span className="font-bold">
              {" "}
              {course.creator.name.toUpperCase()}
            </span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
