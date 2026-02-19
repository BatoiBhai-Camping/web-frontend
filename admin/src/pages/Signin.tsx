import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useLoginRootAdminMutation } from "../features/auth/authApi";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {setCredentials} from "../features/auth/authSlice"
import type { AppDispatch } from "@/store/store";
import { useDispatch} from "react-redux";

type SignInFormInputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [loginUser, { isLoading}] = useLoginRootAdminMutation();
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignInFormInputs> = async (userData) => {
    try {
     const res =  await loginUser(userData).unwrap();
      toast.success("Login successfull");
      dispatch(setCredentials(res.data))
      navigate("/profile");
    } catch (err: any) {
      
      toast.error(err?.data?.message || "Login failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {isLoading && <Loader />}
      <Card className="w-full max-w-md border-2 border-border shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                TA
              </span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Travel Admin
          </CardTitle>
          <CardDescription className="text-base">
            Admin Dashboard Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="admin@travel.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="border-border focus:ring-primary"
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
                className="border-border focus:ring-primary"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold"
            >
              Sign in
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-primary hover:underline font-semibold"
              >
                Sign Up
              </NavLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
