import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
import { useParams } from "react-router-dom";
import {
  useMarkCourseCompletedMutation,
  useGetCourseProgressQuery,
  useMarkCourseInCompleteMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApiSlice";
import { toast } from "sonner";

const CourseProgressPage = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const courseWatchingComplete = true;
  const [
    markCourseInComplete,
    { isSuccess: LoadingMarkCourseCompletedSuccess },
  ] = useMarkCourseInCompleteMutation();
  const [
    markCourseCompleted,
    { isLoading: loadingMarkCourseInCompletedSuccess },
  ] = useMarkCourseCompletedMutation();
  const {
    data: getCourseDetail,
    isLoading: loadingCourseProgressDetail,
    isError: loadingCourseProgressDetailError,
    error: getCourseDetailError,
    refetch,
  } = useGetCourseProgressQuery(courseId);

  useEffect(() => {
    if (LoadingMarkCourseCompletedSuccess) {
      refetch();
      toast.success("mark us completed");
    }
    if (loadingMarkCourseInCompletedSuccess) {
      refetch();
      toast.success("mark us in completed");
    }
  }, [loadingMarkCourseInCompletedSuccess, LoadingMarkCourseCompletedSuccess]);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  if (loadingCourseProgressDetail) return <p>Loading...</p>;
  if (loadingCourseProgressDetailError)
    return <p>Failed to load course details</p>;

  const handleLectureProgress = async (lectureId) => {
    try {
      console.log(lectureId);
      await updateLectureProgress({ lectureId, courseId });
    } catch (err) {
      console.log(err);
    }
  };

  const { courseDetails, progress } = getCourseDetail?.data;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    // handleLectureProgress(lecture._id);
  };

  const isLectureComplete = (lectureId) => {
    return progress.some(
      (item) =>
        item.lectureId.toString() === lectureId.toString() && item.viewed
    );
  };

  const handleInCompleteCourse = async () => {
    try {
      console.log("calling the handle incomplete course");

      await markCourseInComplete(courseId);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCompleteCourse = async () => {
    try {
      console.log("calling the handle complete course");

      await markCourseCompleted(courseId);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(getCourseDetail.data.completed);

  return (
    <>
      <PageHeader
        title={"Course Title"}
        description={"This is the description of particular course progress"}
      />

      <div className="max-w-7xl mx-auto p-4 mt-16">
        {/* Display course name */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
          <Button
            onClick={
              getCourseDetail.data.completed
                ? handleInCompleteCourse
                : handleCompleteCourse
            }
            variant={getCourseDetail.data?.completed ? "outline" : "default"}
          >
            {getCourseDetail.data?.completed ? (
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
            {initialLecture.videoUrl?.url || currentLecture.videoUrl?.url ? (
              <div>
                <ReactPlayer
                  url={
                    initialLecture.videoUrl.url || currentLecture.videoUrl.url
                  }
                  muted
                  controls
                  className="w-fit h-auto md:rounded-lg"
                  onPlay={() =>
                    handleLectureProgress(
                      currentLecture?._id || initialLecture._id
                    )
                  }
                />
              </div>
            ) : (
              <dir>No video available for this lecture</dir>
            )}

            {/* Display current watching lecture title */}
            <div className="mt-2">
              <h3 className="font-medium text-lg">
                {`Lecture ${
                  courseDetails.lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id)
                  ) + 1
                } : ${
                  currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
              </h3>
            </div>
          </div>

          {/* lecture Sidebar */}
          <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
            <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>

            <div className="flex-1 overflow-y-auto">
              {courseDetails.lectures.map((lecture, index) => (
                <Card
                  key={index}
                  className="mb-3 hover:cursor-pointer transition transform"
                  onClick={() => handleSelectLecture(lecture)}
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
                          {lecture.lectureTitle}
                        </CardTitle>
                      </div>
                    </div>
                    {(isLectureComplete(lecture._id) ||
                      getCourseDetail.data?.completed) && (
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
