import { useForm } from "react-hook-form";
// import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const signupHandler = async (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(signupHandler)}>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account and click signup when you&#39;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: "User Name is required" })}
              placeholder="eg. Arshad"
            />
            {errors.name && (
              <p className="text-red-700" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email Address is required" })}
              placeholder="eg. abcd@gmail.com"
            />
            {errors.email && (
              <p className="text-red-700" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
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

export default Signup;
