import { CheckCircle, CheckCircle2 } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

const CourseProgressPage = () => {
  const courseWatchingComplete = true;

  return (
    <>
      <PageHeader
        title={"Course Title"}
        description={"This is the description of particular course progress"}
      />
      <div className="max-w-7xl mx-auto p-4 mt-16">
        {/* Display course name */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">{"Course Title"}</h1>
          <Button>
            {courseWatchingComplete ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
              </div>
            ) : (
              "Mark as Completed"
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* video section */}
          <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
            <div>
              <ReactPlayer
                url={"https://youtu.be/msGQOO6f3h0?si=ZOWPDX4iIh7AEfqO"}
                muted
                controls
                className="w-full h-auto md:rounded-lg"
                //   onPlay={()=>}
              />
            </div>
            {/* Display current watching lecture title */}
            <div className="mt-2">
              <h3 className="font-medium text-lg">
                {"Lecture - 1: Introduction "}
              </h3>
            </div>
          </div>

          {/* lecture Sidebar */}
          <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
            <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>

            <div className="flex-1 overflow-y-auto">
              {[1, 2, 3, 5].map((lecture, index) => (
                <Card
                  key={index}
                  className="mb-3 hover:cursor-pointer transition transform"
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {courseWatchingComplete ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-500 mr-2"
                        />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">
                          {"lecture Title"}
                        </CardTitle>
                      </div>
                    </div>
                    {courseWatchingComplete && (
                      <Badge
                        variant={"outline"}
                        className="bg-green-200 text-green-600"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseProgressPage;
