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

const LectureTab = () => {
  const [isFree, setIsFree] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const removeLoading = false;
  const isLoading = false;

  const lectureUpdateHandler = async (data) => {
    console.log(data);
    console.log(isFree);

    reset();
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
