import MainLayout from "@/layout/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "@/pages/student/Home";
import LoginPage from "@/pages/LoginPage";
import MyLearningPage from "@/pages/student/MyLearningPage";
import EditProfilePage from "@/pages/student/EditProfilePage";
import Dashboard from "@/pages/admin/Dashboard";
import Sidebar from "@/pages/admin/Sidebar";
import CourseTab from "@/pages/admin/course/CourseTable";
import AddCoursePage from "@/pages/admin/course/AddCoursePage";
import CreateLecturePage from "@/pages/admin/lecture/CreateLecturePage";
import EditLecturePage from "@/pages/admin/lecture/EditLecturePage";
import CourseDetail from "@/pages/student/CourseDetail";
import CourseProgressPage from "@/pages/student/CourseProgressPage";
import SearchCoursePage from "@/pages/student/SearchCoursePage";
import EditCoursePage from "@/pages/admin/course/EditCoursePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="my-learning" element={<MyLearningPage />} />
        <Route path="course-detail/:courseId" element={<CourseDetail />} />
        <Route
          path="course-progress/:courseId"
          element={<CourseProgressPage />}
        />
        <Route path="course/search" element={<SearchCoursePage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />

        <Route path="admin" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="course">
            <Route index element={<CourseTab />} />
            <Route path="create" element={<AddCoursePage />} />
            <Route path=":courseId" element={<EditCoursePage />} />
            
            <Route path=":courseId/lecture" element={<CreateLecturePage />} />
            <Route
              path=":courseId/lecture/:lectureId"
              element={<EditLecturePage />}
            />
          </Route>
        </Route>
      </Route>
    </>
  )
);
