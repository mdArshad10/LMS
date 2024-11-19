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

const Login = () => {
  const { handleSubmit, register, reset, formState:{errors} } = useForm();
  const handleLoginSubmit = async (data) => {
    console.log(data);
    reset();
  };
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
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
