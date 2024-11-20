import CourseTab from "@/components/admin/CourseTab";
import { Button } from "@/components/ui/button";
import React from "react";

const EditCoursePage = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Button>Go to lectures page</Button>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCoursePage;
