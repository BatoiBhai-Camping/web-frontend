import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetAdminRootAdminProfileQuery } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { Loader } from "@/components/Loader";
import type { RootState, AppDispatch } from "@/store/store";
import { toast } from "react-toastify";

const IsRoleApproved = (): any => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasUserData = useSelector((state: RootState) => state.auth.hasUserData);
  const user = useSelector((state: RootState) => state.auth.user);

  const [isValidating, setIsValidating] = useState(true);

  const { data, isLoading, isError, isSuccess } = useGetAdminRootAdminProfileQuery(
    undefined,
    {
      skip: hasUserData && isAuthenticated,
    },
  );

  useEffect(() => {
    // If already authenticated with user data, validate from Redux state
    if (isAuthenticated && hasUserData) {
      setIsValidating(false);
      return;
    }

    // If profile fetch is successful, set credentials
    if (isSuccess && data) {
      dispatch(setCredentials(data.data));
      setIsValidating(false);
    }

    // If profile fetch failed, stop validating
    if (isError) {
      setIsValidating(false);
    }

    // If not loading and not authenticated, stop validating
    if (!isLoading && !isAuthenticated) {
      setIsValidating(false);
    }
  }, [isSuccess, isError, isLoading, isAuthenticated, hasUserData, data, dispatch]);

  // Show loader while validating authentication
  if (isValidating || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  // Redirect to home if not authenticated after validation
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role and status from Redux state
  if (user.role === "ADMIN" && user.roleStatus !== "APPROVED") {
    toast.error("This account is not approved by root admin")
    return <Navigate to="/profile" replace />;
  }

  // Render protected routes if authenticated and approved
  return <Outlet />;
};

export default IsRoleApproved;