import { useRegisterRootAdminMutation } from "../features/auth/authApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";

type SignUpFormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RootAdminSignUpPage() {
  const [registerRootAdmin, { isLoading }] = useRegisterRootAdminMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const password = watch("password");

  const user = useSelector((state: RootState) => state.auth.user);
  console.log("here is the user", user);
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const result = await registerRootAdmin({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Account created successfully!");

      navigate("/verify-email");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 p-4">
      {isLoading && <Loader></Loader>}
      <Card className="w-full max-w-md border-2 border-red-200 dark:border-red-800 shadow-lg shadow-red-100 dark:shadow-red-950/50">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md shadow-red-500/50">
              <span className="text-white font-bold text-xl">RA</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-red-700 dark:text-red-400">
            Root Admin Access
          </CardTitle>
          <CardDescription className="text-base text-red-600 dark:text-red-500">
            Root Administrator Registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter full Name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="border-red-200 dark:border-red-800 focus:ring-red-500 focus:border-red-500"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="rootadmin@system.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="border-red-200 dark:border-red-800 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="border-red-200 dark:border-red-800 focus:ring-red-500 focus:border-red-500"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="border-red-200 dark:border-red-800 focus:ring-red-500 focus:border-red-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-md shadow-red-500/30"
            >
              Create Root Admin Account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Already have an account?{" "}
              <NavLink
                to="/signin"
                className="text-red-600 dark:text-red-400 hover:underline font-semibold"
              >
                Sign In
              </NavLink>
            </p>
            <p>
              Register as Sub Admin{" "}
              <NavLink
                to="/signup"
                className="text-primary hover:underline font-semibold"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
