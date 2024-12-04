import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
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
  useTogglePublishCourseMutation,
} from "@/features/api/courseApiSlice";
import { toast } from "sonner";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const CourseTab = () => {
  const [input, setInput] = useState({
    description: "",
    courseThumbnailImage: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const navigate = useNavigate();
  const { courseId } = useParams();

  const {
    data: courseDataGetByCourseId,
    isLoading: loadingCourseByCourseId,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [
    togglePublishCourse,
    { isLoading: toggleCourseLoading, isError: toggleCourseError },
  ] = useTogglePublishCourseMutation();

  // const [editCourse, { isSuccess, isLoading, data, isError, error }] =
  //   useEditCourseMutation();

  const {
    reset,
    register,
    handleSubmit,
    control,
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

  const updateCourseFormHandler = async (data) => {
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
    // formData.append("courseThumbnail", data.courseThumbnailImage[0].path);
    reset();
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data.message || "Course updated successfully");
  //     refetch();
  //   }
  //   if (isError) {
  //     toast.error(error.message || "Failed to update the course");
  //   }
  // }, [isSuccess, isError]);
  const isLoading = false;

  const ontoggleParticularCourse = async (courseId) => {
    console.log(courseId);
  };

  const onRemoveParticularCourse = async (courseId) => {
    console.log(courseId);
  };

  return loadingCourseByCourseId ? (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              ontoggleParticularCourse(courseDataGetByCourseId.course?._id)
            }
          >
            {courseDataGetByCourseId.course?.isPublished
              ? "Published"
              : "Unpublished"}
          </Button>
          <Button
            onClick={() =>
              onRemoveParticularCourse(courseDataGetByCourseId.course?._id)
            }
          >
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(updateCourseFormHandler)}>
          <div className="space-y-4 mt-4">
            <Controller
              control={control}
              name="courseTitle"
              render={({ field: { value, onChange, ...field } }) => (
                <div>
                  <Label>Course Title</Label>
                  <Input
                    type="text"
                    placeholder="ex. Javascript"
                    {...field}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="subTitle"
              render={({ field: { value, onChange, ...field } }) => (
                <div>
                  <Label>Course Sub-Title</Label>
                  <Input
                    type="text"
                    placeholder="ex. Introduction of Javascript"
                    {...field}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            />

            <div className="w-full flex items-center gap-5">
              <Controller
                control={control}
                name="category"
                render={({ field: { value, onChange, ...field } }) => (
                  <div className="w-1/3">
                    <Label>Category</Label>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
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
                          <SelectItem value="Javascript">Javascript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Docker">Docker</SelectItem>
                          <SelectItem value="MongoDB">MongoDB</SelectItem>
                          <SelectItem value="HTML">HTML</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="courseLevel"
                render={({ field: { value, onChange, ...field } }) => (
                  <div className="w-1/3">
                    <Label>Course Level</Label>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
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
                )}
              />

              <Controller
                control={control}
                name="price"
                render={({ field: { value, onChange, ...field } }) => (
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      placeholder="ex. 100"
                      {...field}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  </div>
                )}
              />
            </div>

            {/*  <FormField
                className="flex items-center gap-5"
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a course level" />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ex. Javascript"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        // defaultValue={value}
                        valueAsNumber={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
          </div>
          {/* <div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={(e) => field.onChange(e.target.file)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
          <div className="flex gap-2">
            <Button onClick={() => reset()} variant="outline">
              Cancel
            </Button>
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
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

const CourseTabForm = () => {
  return (
    <form onSubmit={handleSubmit(courseUpdateHandler)}>
      <div className="space-y-4 mt-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            {...register("courseTitle")}
            defaultValue={
              courseDataGetByCourseId.course?.courseTitle
                ? courseDataGetByCourseId.course?.courseTitle
                : ""
            }
            placeholder="Ex. Fullstack developer"
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            {...register("subTitle")}
            defaultValue={
              courseDataGetByCourseId.course?.subTitle
                ? courseDataGetByCourseId.course?.subTitle
                : ""
            }
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
              defaultValue={
                courseDataGetByCourseId.course?.category
                  ? courseDataGetByCourseId.course?.category
                  : ""
              }
              //   onValueChange={selectCategory}
              {...register("category")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="React JS">React JS</SelectItem>
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
              defaultValue={
                courseDataGetByCourseId.course?.courseLevel
                  ? courseDataGetByCourseId.course?.courseLevel
                  : ""
              }
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
              {...register("price", {
                valueAsNumber: true,
              })}
              defaultValue={
                courseDataGetByCourseId.course?.coursePrice
                  ? courseDataGetByCourseId.course?.coursePrice
                  : ""
              }
              placeholder="Ex. 100"
              className="w-fit"
            />
          </div>
        </div>

        <div>
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            {...register("courseThumbnail")}
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
  );
};
