import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "@/components/student/course";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/features/api/authApiSlice";
import { toast } from "sonner";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const userDetails = [
    {
      title: "Name",
      value: "Md. Arshad",
    },
    { title: "Email", value: "me@example.com" },
    { title: "Role", value: "student" },
  ];
  const { data, isLoading: getProfileLoading, refetch } = useGetProfileQuery();

  const [
    updateProfile,
    {
      isLoading,
      isSuccess,
      isError,
      data: userUpdateData,
      error: updateProfileError,
    },
  ] = useUpdateProfileMutation();

  const ourEnrolledCourses = [1, 2, 3];

  const onChangeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const onChangeProfileDetails = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "profile updated successfully");
    }
    if (isError) {
      toast.error(updateProfileError.message || "Failed to update the profile");
    }
  }, [isSuccess, userUpdateData, updateProfileError, isError]);

  //   const isLoading = false;
  return (
    <div className="max-w-4xl mx-auto mt-16 mb-10 px-4 md:px-0 pb-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          {userDetails.map(({ title, value }, index) => (
            <UserDetail key={index} title={title} value={value} />
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button sm="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    className="col-span-3"
                    onChange={(e) => e.target.value}
                    value={name}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profilePhoto" className="text-right">
                    Profile Photo
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onChangeProfileDetails}
                    id="profilePhoto"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={isLoading}
                  onClick={onChangeFileHandler}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ...
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Course you're enrolled</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {ourEnrolledCourses.length == 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            ourEnrolledCourses.map((_, index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

const UserDetail = ({ title, value }) => {
  return (
    <div className="mb-2">
      <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
        {title}:
        <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
          {title !== "Role" ? value : value.toUpperCase()}
        </span>
      </h1>
    </div>
  );
};

export default EditProfilePage;