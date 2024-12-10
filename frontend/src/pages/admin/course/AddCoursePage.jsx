import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useCreateCourseMutation } from "@/features/api/courseApiSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { courseCategories } from "@/app/data";




const AddCoursePage = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
  });

  const [createCourse, { isLoading, isSuccess, data, isError, error }] =
    useCreateCourseMutation();

  const createCourseHandler = async (data) => {
    try {
      console.log(data);
      await createCourse(data).unwrap();
      navigate("/admin/course");
      form.reset({
        courseTitle: "",
        category: "",
      });
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "course added successfully");
    }
    if (isError) {
      toast.error(error.message || "Some thing wrong in adding the course");
    }
  }, [isLoading, data, isError, error]);

  return (
    <Form {...form} className="flex-1 mb-10">
      <form onSubmit={form.handleSubmit(createCourseHandler)}>
        <div className="mb-4">
          <h1 className="font-bold text-xl">
            Lets add course, add some basic course details for your new course
          </h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            laborum!
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="courseTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Your Course Name"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    form.setValue("category", value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
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
                </Select>
              </FormItem>
            )}
          />

          <div className="flex item-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/course`)}
            >
              Back
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
        </div>
      </form>
    </Form>
  );
};

export default AddCoursePage;
