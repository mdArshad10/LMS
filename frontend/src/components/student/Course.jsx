import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Link, useParams } from "react-router-dom";

const Course = ({ course }) => {
  const { courseId } = useParams();
  return (
    <Link to={`course-detail/${courseId}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CardHeader className="relative">
          <img
            src={"https://github.com/shadcn.png"}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <h1 className="hover:underline font-bold text-lg truncate">
            Course Title
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <h1 className="font-medium text-sm">Creator Name</h1>
            </div>
            <Badge
              className={
                "bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
              }
            >
              course level
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹ Price </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
