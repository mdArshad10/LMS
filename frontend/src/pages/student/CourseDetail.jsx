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
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApiSlice";
import PageHeader from "@/components/PageHeader";
import { useEffect } from "react";
import SpinnerLoading from "@/components/SpinnerLoading";

const CourseDetail = () => {
  const purchasedCourse = true;
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } =
    useGetCourseDetailWithStatusQuery(courseId);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching course data</p>;
  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchasedCourse) {
      navigate(`course-progress/${courseId}`);
    }
  };

  return (
    <>
      <PageHeader
        title={course.courseTitle}
        description={"This is description page of particular page"}
      />
      {isLoading ? (
        <SpinnerLoading/>
      ) : isError ? (
        <p>Error fetching course data</p>
      ) : (
        <div className="space-y-5 pt-16">
          <div className="bg-[#2D2F31] text-white">
            <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-3xl">
                {course.courseTitle}
              </h1>
              <p className="text-base md:text-lg">{course.subTitle}</p>
              <p className="text-[#C0C4FC] underline italic">
                Created By <span>{course.creator?.name.toUpperCase()}</span>
              </p>
              <div className="flex items-center gap-2 text-sm">
                <BadgeInfo size={16} />
                <p>Last updated {course.creator?.createdAt?.split("T")[0]}</p>
              </div>
              <p>Students enrolled: {course.enrolledStudent?.length}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
            <div className="w-full lg:w-1/2 space-y-5">
              <h1 className="font-bold text-xl md:text-2xl">Description</h1>
              <p className="text-sm">{course.description}</p>
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    {course.lectures?.length} lectures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.lectures.map((lecture, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span>
                        {lecture.isPreviewFree ? (
                          <PlayCircle size={14} />
                        ) : (
                          <Lock size={14} />
                        )}
                      </span>
                      <p>{lecture.lectureTitle}</p>
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
                      url={
                        course.lectures?.[0].videoUrl?.url ||
                        "https://youtu.be/TCv8V-zsfRM?si=lNP8A6nPrZsn6Xpa"
                      }
                      width={"100%"}
                      height={"100%"}
                      controls={true}
                    />
                  </div>
                  <h1>{course.lectures[0].lectureTitle}</h1>
                  <Separator className="my-2" />
                  <h1 className="text-lg md:text-xl font-semibold">
                    {purchased ? (
                      <span> Purchased</span>
                    ) : (
                      <span>Course Price: Rs. {course.coursePrice}</span>
                    )}
                  </h1>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  {purchased ? (
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
      )}
    </>
  );
};

export default CourseDetail;
