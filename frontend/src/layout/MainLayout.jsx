import Navbar from "@/components/Navbar";
import SpinnerLoading from "@/components/SpinnerLoading";
import { useGetProfileQuery } from "@/features/api/authApiSlice";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
  const { isLoading } = useGetProfileQuery();

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div>
          <Navbar />
          <Outlet />
          <Toaster />
        </div>
      )}
    </>
  );
};

export default MainLayout;
