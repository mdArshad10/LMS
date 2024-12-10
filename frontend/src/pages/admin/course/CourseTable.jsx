import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApiSlice";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

const CourseTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, error, refetch } =
    useGetCreatorCourseQuery();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <div>
      <Button onClick={() => navigate("create")}>Create a New Course</Button>
      {data.courses.length === 0 ? (
        <div className="w-full h-2/4 grid place-items-center">
          No Course Found
        </div>
      ) : (
        <Table className="mt-5">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">
                  {course.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge>{course.isPublished ? "published" : "Draft"}</Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseTable;
