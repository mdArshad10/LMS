import CourseTab from "@/components/admin/CourseTab";
import CourseTabTry from "@/components/admin/CourseTabTry";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EditCoursePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Button onClick={() => navigate("lecture")}>Go to lectures page</Button>
      </div>
      {/* <CourseTab /> */}
      <CourseTabTry />
    </div>
  );
};

export default EditCoursePage;
