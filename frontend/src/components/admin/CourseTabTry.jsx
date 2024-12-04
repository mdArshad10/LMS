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
} from "@/features/api/courseApiSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const CourseTabTry = () => {
  // const navigate = useNavigate();
  const { courseId } = useParams();

  // get course by course id
  const {
    data: courseDataGetByCourseId,
    isLoading: loadingCourseByCourseId,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  console.log(courseDataGetByCourseId);

  // toggle the course
  const [
    togglePublishCourse,
    {
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
      isSuccess: editCourseSuccess,
      isError: editCourseError,
      error: editCourseErrorData,
      data: editCourseData,
    },
  ] = useEditCourseMutation();

  const form = useForm({
    defaultValues: {
      courseTitle: courseDataGetByCourseId?.course?.courseTitle || "",
      subTitle: courseDataGetByCourseId?.course?.subTitle || "",
      price: courseDataGetByCourseId?.course?.price || 0,
      category: courseDataGetByCourseId?.course?.category || "",
      courseLevel: courseDataGetByCourseId?.course?.courseLevel || "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("subTitle", data.subTitle);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("category", data.category);
    formData.append("courseLevel", data.courseLevel);
    formData.append("coursePrice", data.price);
    // formData.append("courseThumbnail", data.);

    // await editCourse(formData);

    form.reset({
      courseTitle: "",
      subTitle: "",
      price: 0,
      category: "",
      courseLevel: "",
      avatar: "",
    });
  };

  const ontoggleParticularCourse = async (courseId) => {
    console.log(`${courseId} is published or unpublished`);
    //await togglePublishCourse();
  };

  const removeCourseHandler = (courseId) => {
    console.log(`course ${courseId} is removed`);
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
      refetch();
    }
    if (editCourseError) {
      toast.error(editCourseData.message || "Course failed to updated it");
    }
  }, [
    toggleCourseSuccess,
    toggleCourseError,
    editCourseSuccess,
    editCourseError,
  ]);

  return loadingCourseByCourseId ? (
    <p>Loading...</p>
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
            {courseDataGetByCourseId?.course?.isPublished
              ? "Published"
              : "Unpublished"}
          </Button>
          <Button
            onClick={() =>
              removeCourseHandler(courseDataGetByCourseId.course?._id)
            }
          >
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Javascript"
                      onChange={(e) => onChange(e.target.value)}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subTitle"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Course Sub-Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => onChange(e.target.value)}
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

            <div className="flex gap-10 w-full ">
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
                            <SelectItem value="React JS">React JS</SelectItem>
                            <SelectItem value="Next JS">Next JS</SelectItem>
                            <SelectItem value="Data Science">
                              Data Science
                            </SelectItem>
                            <SelectItem value="Frontend Development">
                              Frontend Development
                            </SelectItem>
                            <SelectItem value="Fullstack Development">
                              Fullstack Development
                            </SelectItem>
                            <SelectItem value="MERN Stack Development">
                              MERN Stack Development
                            </SelectItem>
                            <SelectItem value="Javascript">
                              Javascript
                            </SelectItem>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="Docker">Docker</SelectItem>
                            <SelectItem value="MongoDB">MongoDB</SelectItem>
                            <SelectItem value="HTML">HTML</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
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
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Advance">Advance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="eg. 100"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Course Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(event) => {
                          onChange(event.target.files[0]);
                        }}
                        {...field}
                        value={value?.fileName}
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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseTabTry;
