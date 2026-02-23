import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Shield } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAdminRootAdminProfileQuery } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";

import { Loader } from "@/components/Loader";
import type { RootState } from "../store/store";

export default function Home() {
  const router = useNavigate();
  const dispatch = useDispatch();
  const hasCheckedAuth = useRef(false);

  const hasUserData: boolean = useSelector((state: RootState) => {
    return state.auth.hasUserData as boolean;
  });
  const isAuthenticated: boolean = useSelector((state: RootState) => {
    return state.auth.isAuthenticated as boolean;
  });
  const { data, isLoading, isError, error, isSuccess } =
    useGetAdminRootAdminProfileQuery(undefined, {
      skip: hasUserData && isAuthenticated,
    });

  const handleSignIn = () => {
    router("/signin");
  };

  const handleSignUp = () => {
    router("/signup");
  };

  // Handle automatic profile fetching and authentication
  useEffect(() => {
    if (hasCheckedAuth.current) return;

    if (isSuccess && data?.data) {
      hasCheckedAuth.current = true;
      dispatch(setCredentials(data.data));
      toast.success("Welcome back! Redirecting to profile...");
      router("/profile");
    }

    if (isError) {
      hasCheckedAuth.current = true;
      toast.error("Failed to fetch profile. Please sign in.");
      router("/signin")
    }
  }, [isSuccess, isError, data, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background p-4">
      {isLoading && <Loader></Loader>}
      <Card className="max-w-2xl w-full border-2 border-border shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BatoiBhai
            </CardTitle>
            <CardDescription className="text-lg">
              Admin Dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Welcome to the Admin Portal
            </h2>
            <p className="text-muted-foreground">
              Manage your platform efficiently with powerful admin tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              onClick={handleSignIn}
              className="h-12 text-lg gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              Sign In
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="h-12 text-lg gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              Sign Up
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
