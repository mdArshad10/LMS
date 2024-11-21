import LectureTab from "@/components/admin/LectureTab";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditLecturePage = () => {
  const navigate = useNavigate();
  const { CourseId } = useParams();

  return (
    <div className="flex flex-col gap-4 justify-between mb-5">
      <div className="flex items-center gap-2">
        <Link>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="font-bold text-xl">Update Your Lecture</h1>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecturePage;
