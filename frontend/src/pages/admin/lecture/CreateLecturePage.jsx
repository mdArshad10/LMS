import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateLectureMutation, useGetCourseAllLecturesQuery } from "@/features/api/courseApiSlice";
import { toast } from "sonner";
import Lecture from "@/components/admin/Lecture";

const CreateLecturePage = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [createLecture, { isLoading, isSuccess, data, isError, error }] =
    useCreateLectureMutation();

  const {
    data: getLectureData,
    isLoading: getLectureLoading,
    isError: getLectureError,
    refetch,
  } = useGetCourseAllLecturesQuery(courseId);

  const createLectureHandler = async (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "lecture created successfully");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex-1 mb-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <form onSubmit={handleSubmit(createLectureHandler)} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            {...register("lectureTitle", {
              required: "Lecture Title is required",
            })}
            placeholder="Your Course Name"
          />
        </div>

        <div className="flex item-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ... Please
                wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
      <div className="mt-10">
        {/* {getLectureLoading ? (
          <p>...loading lecture</p>
        ) : getLectureError ? (
          <p>Failed to load lecture</p>
        ) : getLectureData.length === 0 ? (
          <p>No Lectures Available</p>
        ) : (
          <Lecture />
        )} */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Lecture key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CreateLecturePage;
