import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
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
} from "@/features/api/courseApiSlice";

const LectureTab = () => {
  const form = useForm();

  // delete the lecture
  const [
    deleteLecture,
    {
      isLoading: deleteLectureLoading,
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
      isError: editLectureError,
      data: editLectureData,
      error: editLectureErrorData,
    },
  ] = useEditLectureMutation();

  const removeLoading = false;
  const isLoading = false;

  const lectureUpdateHandler = async (data) => {
    console.log(data);

    form.reset();
  };

  const uploadFileHandler = (field) => {
    console.log(field);

    form.setValue(
      "lectureVideo",
      "https://youtu.be/lfn2P6S2mR4?si=9RtjK7AhEWRvI7Gg"
    );
  };

  return (
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
            // onClick={removeLectureHandler}
            onClick={() => console.log("removeLecture")}
          >
            {removeLoading ? (
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
                    />
                  </FormControl>
                </FormItem>
              )}
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
            />
            <div className="mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
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

const lectureEditCard = () => {
  return (
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
            // onClick={removeLectureHandler}
            onClick={() => console.log("removeLecture")}
          >
            {removeLoading ? (
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
        <form onSubmit={handleSubmit(lectureUpdateHandler)}>
          <div className="space-y-4 mt-1">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                {...register("lectureTitle")}
                placeholder="Ex. Introduction to Javascript"
              />
            </div>
            <div className="my-5">
              <Label>
                Video<span className="text-red-500">*</span>
              </Label>
              <Input
                type="file"
                accept="video/*"
                {...register("lectureVideo")}
                placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              />
            </div>
            <div className="flex items-center space-x-2 my-5">
              <Switch
                checked={isFree}
                onCheckedChange={setIsFree}
                id="airplane-mode"
              />
              <Label htmlFor="airplane-mode">Is this video FREE</Label>
            </div>

            <div className="mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Update Lecture"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
