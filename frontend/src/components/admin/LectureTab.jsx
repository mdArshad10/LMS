import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  useDeleteLectureMutation,
  useEditLectureMutation,
  useGetParticularLectureQuery,
} from "@/features/api/courseApiSlice";
import { toast } from "sonner";
import axios from "axios";
import { baseUrl } from "@/app/data";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";

const LectureTab = ({ courseId, lectureId }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(false);
  const form = useForm();
  const navigate = useNavigate();

  const {
    data: particularLectureData,
    isLoading: loadingParticulareLecture,
    isError: loadingParticulareLectureError,
    error: particulareLectureErrorData,
  } = useGetParticularLectureQuery(lectureId);

  // delete the lecture
  const [
    deleteLecture,
    {
      isLoading: deleteLectureLoading,
      isSuccess: deleteLectureLoadingSuccess,
      isError: deleteLectureError,
      data: deleteLectureData,
      error: deleteLectureErrorData,
    },
  ] = useDeleteLectureMutation();

  // update the lecture
  const [
    editLecture,
    {
      isLoading: editLectureLoading,
      isSuccess: editLectureSuccess,
      isError: editLectureError,
      data: editLectureData,
      error: editLectureErrorData,
    },
  ] = useEditLectureMutation();

  const lectureUpdateHandler = async (data) => {
    try {
      await editLecture({ data: data, courseId, lectureId });
      form.reset();
    } catch (error) {
      toast.error(error.message || "something wrong with updating the lecture");
    }
  };

  const uploadFileHandler = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error("please select a file");
      return;
    }
    try {
      setMediaProgress(true);

      const formData = new FormData();
      formData.append("lecture", file);

      const resp = await axios.post(`${baseUrl}/media/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });

      if (resp.data?.success) {
        form.setValue("videoUrl", resp.data?.data);
        toast.message(resp.data.message);
      }
    } catch (error) {
      toast.error(
        error.message || "something wrong with during file uploading"
      );
    } finally {
      setMediaProgress(false);
    }
  };

  const removeLectureHandler = async (lectureId) => {
    try {
      await deleteLecture(lectureId);
    } catch (err) {
      toast.error(err.message || "something wrong with deleting the lecture");
    }
  };

  useEffect(() => {
    if (deleteLectureLoadingSuccess) {
      toast.success("the lecture is delete successfully");
      navigate(`/admin/course/${courseId}/lecture`);
    }
    if (deleteLectureError) {
      toast.error("some thing wrong with deleting lecture");
    }
    if (editLectureSuccess) {
      toast.success("Lecture update successfully");
      navigate(`/admin/course/${courseId}/lecture`);
    }
    if (editLectureError) {
      toast.error("some thing wrong with updating the lecture");
    }
  }, [
    deleteLectureLoadingSuccess,
    deleteLectureError,
    editLectureSuccess,
    editLectureError,
    courseId,
  ]);

  return loadingParticulareLecture ? (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  ) : loadingParticulareLectureError ? (
    <h1>some thing wrong with fetching the data</h1>
  ) : (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={false}
            variant="destructive"
            onClick={() => removeLectureHandler(lectureId)}
          >
            {deleteLectureLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(lectureUpdateHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="lectureTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecture Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Introduction of Javascript"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
              defaultValue={particularLectureData.lecture?.lectureTitle || ""}
            />

            <FormField
              control={form.control}
              name="lectureVideo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Video<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      placeholder="eg. Introduction of Javascript"
                      {...field}
                      onChange={uploadFileHandler}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPreviewFree"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 h-10">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is this video FREE</FormLabel>
                </FormItem>
              )}
              defaultValue={
                particularLectureData.lecture?.isPreviewFree || false
              }
            />
            {mediaProgress && (
              <div className="my-4">
                <Progress value={uploadProgress} />
                <p>{uploadProgress}% uploaded</p>
              </div>
            )}

            <div className="mt-4">
              <Button type="submit" disabled={editLectureLoading}>
                {editLectureLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Update Lecture"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
