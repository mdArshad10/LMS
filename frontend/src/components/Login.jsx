import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLoginMutation } from "@/features/api/authApiSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [
    login,
    { isLoading, data: loginUserData, isSuccess },
  ] = useLoginMutation();

  const handleLoginSubmit = async (data) => {
    const response = await login(data).unwrap();
    dispatch(userLoggedIn(response.data));
    navigate(from, { replace: false });
    reset();
  };


  useEffect(() => {
    if (isSuccess && loginUserData) {
      toast.success(loginUserData.message);
    }
  }, [isSuccess, loginUserData]);

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login your password here. After signup, you&#39;ll be logged in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="loginEmail">Email</Label>
            <Input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              id="loginEmail"
              placeholder="Eg. abcd@gmail.com"
            />
            {errors.email && (
              <p className="text-red-700" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="loginPassword">Password</Label>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
              id="loginPassword"
              placeholder="eg. abcd@123"
            />
            {errors.password && (
              <p className="text-red-700" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ... Please
                wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
