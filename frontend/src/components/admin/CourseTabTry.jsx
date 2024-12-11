import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useTogglePublishCourseMutation,
  useDeleteCoursesMutation,
} from "@/features/api/courseApiSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { courseCategories, courseDifficulties } from "@/app/data";
import { Loader2 } from "lucide-react";
import SpinnerLoading from "../SpinnerLoading";

const CourseTabTry = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
  });

  // get course by course id
  const {
    data: courseDataGetByCourseId,
    isLoading: loadingCourseByCourseId,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [
    togglePublishCourse,
    {
      isLoading: loadingTogglePublishCourse,
      isError: toggleCourseError,
      error: toggleCourseErrorData,
      data: toggleCourseData,
      isSuccess: toggleCourseSuccess,
    },
  ] = useTogglePublishCourseMutation();

  // edit the course
  const [
    editCourse,
    {
      isLoading: editCourseLoading,
      isSuccess: editCourseSuccess,
      isError: editCourseError,
      error: editCourseErrorData,
      data: editCourseData,
    },
  ] = useEditCourseMutation();

  // delete the course
  const [deleteCourses, { isSuccess, isLoading, isError, error }] =
    useDeleteCoursesMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", data.thumbnail);
      formData.append("courseTitle", data.courseTitle);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("subTitle", data.subTitle);
      formData.append("category", data.category);
      formData.append("courseLevel", data.courseLevel);

      await editCourse({ formData, courseId });
    } catch (err) {
      toast.error(err.message || "something wrong with course updating");
    }
  };

  const ontoggleParticularCourse = async (courseId) => {
    try {
      console.log(`${courseId} is published or unpublished`);
      //await togglePublishCourse();
    } catch (err) {
      toast.error(err.message || "something wrong with toggle this course");
    }
  };

  const removeCourseHandler = async (courseId) => {
    try {
      await deleteCourses(courseId);
    } catch (err) {
      toast.error(err.message || "something wrong with delete this course");
    }
  };

  useEffect(() => {
    if (toggleCourseSuccess) {
      toast.success(
        toggleCourseData.message || `Course is toggle successfully`
      );
      refetch();
    }
    if (toggleCourseError) {
      toast.error(
        toggleCourseErrorData.message || "Failed to toggle the course"
      );
    }

    // Edit the course
    if (editCourseSuccess) {
      toast.success(editCourseData.message || "Course updated successfully");
      navigate("/admin/course");
    }
    if (editCourseError) {
      toast.error(editCourseData.message || "Course failed to updated it");
    }
    // if the delete the course
    if (isSuccess) {
      toast.success("course is delete successfully");
      navigate("/admin/course");
    }
    if (isError) {
      toast.error("something is wrong with fetching the data");
    }
  }, [
    toggleCourseSuccess,
    toggleCourseError,
    editCourseSuccess,
    editCourseError,
    isSuccess,
    isError,
  ]);

  return loadingCourseByCourseId ? (
    <SpinnerLoading/>
  ) : (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you&apos;re done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              ontoggleParticularCourse(courseDataGetByCourseId.course?._id)
            }
          >
            {loadingTogglePublishCourse ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : courseDataGetByCourseId?.course?.isPublished ? (
              "Unpublished"
            ) : (
              "Published"
            )}
          </Button>
          <Button
            onClick={() => {
              removeCourseHandler(courseDataGetByCourseId.course?._id);
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove the Course"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            encType="multipart/form-data"
          >
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="eg. Javascript"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
              defaultValue={courseDataGetByCourseId?.course?.courseTitle || ""}
            />

            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Sub-Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ""}
                      placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <RichTextEditor field={field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-10 w-full lg:pt-6  pt-16 ">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {courseCategories.map((category) => (
                              <SelectItem
                                key={category.label + category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                defaultValue={courseDataGetByCourseId?.course?.category || ""}
              />
              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Course Level</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Course Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Course Level</SelectLabel>
                          {courseDifficulties.map((course) => (
                            <SelectItem
                              key={course.label + course.value}
                              value={course.value}
                            >
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="eg. 100"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.files[0]);
                        }}
                        value={field.value?.fileName}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">
                {editCourseLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Update the Course"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseTabTry;
