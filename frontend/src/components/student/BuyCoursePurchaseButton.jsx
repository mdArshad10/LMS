import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionsMutation } from "@/features/api/purchaseApiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuyCoursePurchaseButton = ({ courseId }) => {
  const navigate = useNavigate();

  const [
    createCheckoutSessions,
    { isLoading, isError, isSuccess, error, data },
  ] = useCreateCheckoutSessionsMutation();

  const purchaseCourseHandler = async (courseId) => {
    try {
      await createCheckoutSessions({ courseId });

    } catch (err) {
      toast.error(err.message || "something in creating checkout session");
    }
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
      toast.error(error.message || "something wrong with stripe");
    }
  }, [data, error, isError, isSuccess]);

  return (
    <Button
      disabled={isLoading}
      onClick={() => purchaseCourseHandler(courseId)}
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
