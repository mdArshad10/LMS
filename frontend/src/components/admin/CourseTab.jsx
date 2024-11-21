import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RichTextEditor from "../RichTextEditor";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApiSlice";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const CourseTab = () => {
  const [input, setInput] = useState({
    description: "",
    courseThumbnailImage: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const {
    data: courseDataGetByCourseId,
    isLoading: loadingCourseByCourseId,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [editCourse, { isSuccess, isLoading, data, isError, error }] =
    useEditCourseMutation();

  // const existingCourseDetail = courseDataGetByCourseId?.course;

  const isPublished = true;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const isLoading = false;

  // set the file url
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnailImage: file }));
      // convert data to url for thumbnail
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const courseUpdateHandler = async (data) => {
    // Call your API to update the course here
    console.log(data);
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("subTitle", data.subTitle);
    formData.append("description", input.description);
    formData.append("category", data.category);
    formData.append("category", data.category);
    formData.append("courseLevel", data.courseLevel);
    formData.append("coursePrice", data.price);
    formData.append("courseThumbnail", input.courseThumbnailImage);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully");
      refetch();
    }
    if (isError) {
      toast.error(error.message || "Failed to update the course");
    }
  }, [isSuccess, isError]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            {isPublished ? "Published" : "Unpublished"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(courseUpdateHandler)}>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                {...register("courseTitle")}
                // defaultValue={
                //   existingCourseDetail ? existingCourseDetail.title : ""
                // }
                placeholder="Ex. Fullstack developer"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                {...register("subTitle")}
                placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select
                  //   defaultValue={input.category}
                  //   onValueChange={selectCategory}
                  {...register("category")}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Next JS">Next JS</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Frontend Development">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="Fullstack Development">
                        Fullstack Development
                      </SelectItem>
                      <SelectItem value="MERN Stack Development">
                        MERN Stack Development
                      </SelectItem>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Docker">Docker</SelectItem>
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select
                  //   defaultValue={input.courseLevel}
                  //   onValueChange={selectCourseLevel}
                  {...register("courseLevel")}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  {...register("price")}
                  placeholder="Ex. 100"
                  className="w-fit"
                />
              </div>
            </div>

            <div>
              <Label>Course Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit"
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  className="e-64 my-2"
                  alt="Course Thumbnail"
                  width={300}
                  height={150}
                />
              )}
            </div>

            <div className="flex gap-2">
              <Button>Cancel</Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ... Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
