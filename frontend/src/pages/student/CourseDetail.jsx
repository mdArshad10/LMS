import BuyCoursePurchaseButton from "@/components/student/BuyCoursePurchaseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseDetail = () => {
  const purchasedCourse = true;
  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleContinueCourse = () => {
    if (purchasedCourse) {
      navigate(`/course-progress/${courseId}`);
    }
  };
  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{"Course Title"}</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p className="text-[#C0C4FC] underline italic">
            Created By <span>{"Arshad"}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {"12/23/2024"}</p>
          </div>
          <p>Students enrolled:{123}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            quidem impedit blanditiis, quaerat ab officia voluptates, modi ullam
            optio error facilis sint iure incidunt magni nam obcaecati id
            laborum doloribus.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{4} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))} */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{"Javascript introduction"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  url={"https://youtu.be/TCv8V-zsfRM?si=lNP8A6nPrZsn6Xpa"}
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                />
              </div>
              <h1>Lecture Tile</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button className="w-full" onClick={handleContinueCourse}>
                  Continue Course
                </Button>
              ) : (
                <BuyCoursePurchaseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
