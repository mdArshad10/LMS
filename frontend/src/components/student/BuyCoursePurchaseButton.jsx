import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionsMutation } from "@/features/api/purchaseApiSlice";
import { toast } from "sonner";

const BuyCoursePurchaseButton = ({ courseId }) => {
  //   const isLoading = false;

  const [
    createCheckoutSessions,
    { isLoading, isError, isSuccess, error, data },
  ] = useCreateCheckoutSessionsMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSessions(courseId).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    }
    if (isError) {
      toast.error(error.message);
    }
  }, [data, error, isError, isSuccess]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCoursePurchaseButton;
